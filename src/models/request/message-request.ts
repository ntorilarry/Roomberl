export interface chatRequest {
 content: string;
 parent?: string;
 objectType: string;
 objectId: string;
}

export interface messageRequest {
content: string;
   }

   export interface messageRequestParams{
    body: messageRequest;
    roomid: string;
  }