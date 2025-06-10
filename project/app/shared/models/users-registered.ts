
export type userRegisteredApi = {
  ID_FUNC: number,
  FK_PERMISSAO: number,
  TIPO:string,
  NOME: string,
  EMAIL: string,
  TEL: string,
  CPF: string,
  FOTO: string
}
export type senhaUser = {
  senhaAtual:string,
  senhaNova:string,
  confirmarSenha:string
}

export type UpdateSenhaResponse = {
  sucesso: boolean;
  message: string;
  resultado?: any;
}

export type ImageUploadResponse = {
  sucesso: boolean;
  message?: string;
  path?: string; 
}