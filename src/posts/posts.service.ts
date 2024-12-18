import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';
import { Post } from './posts.entity';

@Injectable()
export class PostsService {
  constructor(@InjectRepository(Post) private repo: Repository<Post>) {}

  findAll() {
    return this.repo.find();
  }

  private saveImage(file: Express.Multer.File): string {
    const uploadDir = join(__dirname, '..', '..', 'uploads');
    if (!existsSync(uploadDir)) {
      mkdirSync(uploadDir);
    }
    const timestamp = Date.now();
    const fileName = `${timestamp}-${file.originalname}`;
    const uploadPath = join(uploadDir, fileName);
    writeFileSync(uploadPath, file.buffer);
    return `/uploads/${fileName}`;
  }

  create(post: Partial<CreatePostDto>, user: User, file: Express.Multer.File) {
    const imagePath = file ? this.saveImage(file) : null;

    const newPost = this.repo.create({
      ...post,
      user_id: user.id,
      image_url: imagePath,
    });

    return this.repo.save(newPost);
  }

  async findOne(id: number) {
    const post = await this.repo.findOne({
      where: { id },
      relations: { user: true },
      withDeleted: true,
    });

    if (!post) throw new NotFoundException('Post não encontrado');

    return post;
  }

  async update(
    id: number,
    attrs: Partial<UpdatePostDto>,
    user: User,
    file: Express.Multer.File,
  ) {
    const post = await this.repo.findOneBy({ id });

    if (!post) throw new NotFoundException('Post não encontrado');

    if (user.id !== post.user_id)
      throw new UnauthorizedException('Usuário não autorizado');

    Object.assign(post, attrs);

    if (file) {
      const imagePath = this.saveImage(file);
      post.image_url = imagePath;
    }

    return this.repo.save(post);
  }

  async remove(id: number, user: User) {
    const post = await this.repo.findOne({
      where: { id },
      relations: { comments: true },
    });

    if (!post) throw new NotFoundException('Post não encontrado');

    if (user.id !== post.user_id)
      throw new UnauthorizedException('Usuário não autorizado');

    if (!post) throw new NotFoundException('Não foi possível excluir o post');

    return this.repo.remove(post);
  }
}
