declare module "adminjs" {
  const AdminJS: any;
  export default AdminJS;
}

declare module "@adminjs/express" {
  const AdminJSExpress: any;
  export default AdminJSExpress;
}

declare module "@adminjs/prisma" {
  export const Database: any;
  export const Resource: any;
}
