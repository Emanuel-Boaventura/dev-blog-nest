import { User } from 'src/users/user.entity';

export interface ApiRequest {
  readonly body: ReadableStream<Uint8Array> | null;
  readonly params: { [key: string]: string };
  readonly query: { [key: string]: string };
  readonly headers: Headers & { authorization: string };
  readonly url: string;
  readonly files: {
    buffer: Buffer;
    encoding: string;
    fieldname: string;
    mimetype: string;
    originalname: string;
    size: number;
  }[];
  readonly user?: User;
}
