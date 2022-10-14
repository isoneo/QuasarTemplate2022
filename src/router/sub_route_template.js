export const template_routes = [
  {
    path: "/template",
    component: () => import("layouts/MainLayout.vue"),
    meta: { authenticationed: true },
    children: [
      {
        path: "base_listing",
        component: () => import("pages/template_folder/BaseListing.vue"),
      },
    ],
  },
];
