export default [
  {
    name: "indexController",
    actions: [{ path: "/", type: "get", name: "index", validator: "" }],
  },
  {
    name: "postController",
    actions: [
      { path: "/posts", type: "get", name: "getPosts", validator: "" },
      {
        path: "/posts/generate",
        type: "get",
        name: "generatePosts",
        validator: "",
      },
    ],
  },
  {
    name: "courseController",
    actions: [
      {
        path: "/course/register",
        type: "post",
        name: "register",
        validator: "registrationCourse",
      },
    ],
  },
];
