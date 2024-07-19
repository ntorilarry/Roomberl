
export interface EnableUser {
    isActive: true;
  
  }
  export interface EnableUserParams {
    body: EnableUser;
    userId: string;
  }



  export interface UpdateRoleRequest {
    groups: [any];

  }
  export interface UpdateRoleParams {
    body: UpdateRoleRequest;
    userId: string;
  }