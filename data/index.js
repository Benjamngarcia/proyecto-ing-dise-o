export const allBreads = [
  {
    id: 1,
    img: "https://chedrauimx.vtexassets.com/arquivos/ids/30741303-800-auto?v=638522652139230000&width=800&height=auto&aspect=true",
    name: "Concha",
    price: 12,
    description:
      "Este pan es muy rico y dulce. Es perfecto para acompañar con un café o un chocolate caliente.",
    comments: [
      {
        id: 1,
        userId: 1,
        comment: "Me encanta la concha, es mi favorita.",
        score: 5,
      },
      {
        id: 2,
        userId: 2,
        comment: "Es un pan muy rico, pero prefiero otro tipo de pan.",
        score: 4,
      },
      {
        id: 3,
        userId: 3,
        comment: "No me gusta mucho la concha, prefiero otro tipo de pan.",
        score: 3,
      },
    ],
  },
  {
    id: 2,
    img: "https://lagranbodega.vteximg.com.br/arquivos/ids/215151-600-600/888075.jpg?v=636801426562100000",
    name: "Bolillo",
    price: 10,
    description:
      "Disfruta de un pan crujiente y delicioso. Perfecto para hacer tortas o acompañar con un guisado.",
    comments: [
      {
        id: 1,
        userId: 1,
        comment: "Me encanta el bolillo, es mi favorito.",
        score: 5,
      },
      {
        id: 2,
        userId: 2,
        comment: "Es un pan muy rico, pero prefiero otro tipo de pan.",
        score: 4,
      },
      {
        id: 3,
        userId: 3,
        comment: "No me gusta mucho el bolillo, prefiero otro tipo de pan.",
        score: 3,
      },
    ],
  },
  {
    id: 3,
    img: "https://vivamas.com.mx/wp-content/uploads/2021/03/ROLLO-DE-PIN%CC%83A-MIL-HOJAS.png",
    name: "Rollito de piña",
    price: 15,
    description:
      "Descubre el sabor de la piña en un pan dulce. Perfecto para disfrutar en la tarde con un refresco.",
    comments: [
      {
        id: 1,
        userId: 1,
        comment: "Me encanta el rollito de piña, es mi favorito.",
        score: 5,
      },
      {
        id: 2,
        userId: 2,
        comment: "Es un pan muy rico, pero prefiero otro tipo de pan.",
        score: 4,
      },
      {
        id: 3,
        userId: 3,
        comment:
          "No me gusta mucho el rollito de piña, prefiero otro tipo de pan.",
        score: 3,
      },
    ],
  },
  {
    id: 4,
    img: "https://www.loveganics.com.mx/cdn/shop/products/pangabriel-multigra_1200x1200.jpg?v=1617813062",
    name: "Pan de caja",
    price: 18,
    description:
      "Disfruta de un pan suave y delicioso. Perfecto para hacer sandwiches o tostadas.",
    comments: [
      {
        id: 1,
        userId: 1,
        comment: "Me encanta el pan de caja, es mi favorito.",
        score: 5,
      },
      {
        id: 2,
        userId: 2,
        comment: "Es un pan muy rico, pero prefiero otro tipo de pan.",
        score: 4,
      },
      {
        id: 3,
        userId: 3,
        comment: "No me gusta mucho el pan de caja, prefiero otro tipo de pan.",
        score: 3,
      },
    ],
  },
  {
    id: 5,
    img: "https://chedrauimx.vtexassets.com/arquivos/ids/30725205-800-auto?v=638520858503530000&width=800&height=auto&aspect=true",
    name: "Rebanada de mantequilla",
    price: 25,
    description:
      "Disfruta de una rebanada de pan con mantequilla. Perfecto para acompañar con un café o un chocolate caliente.",
    comments: [
      {
        id: 1,
        userId: 1,
        comment: "Me encanta la rebanada de mantequilla, es mi favorita.",
        score: 5,
      },
      {
        id: 2,
        userId: 2,
        comment: "Es un pan muy rico, pero prefiero otro tipo de pan.",
        score: 4,
      },
      {
        id: 3,
        userId: 3,
        comment:
          "No me gusta mucho la rebanada de mantequilla, prefiero otro tipo de pan.",
        score: 3,
      },
    ],
  },
];

export const allUsers = [
  {
    id: 1,
    firstName: "Alice",
    lastName: "Smith",
    email: "alice@test.com",
    password: "password",
    img: "https://picsum.photos/200/200",
    purchases: [
      [
        {
          id: 1,
          breadId: 1,
          quantity: 2,
        },
        {
          id: 2,
          breadId: 2,
          quantity: 1,
        },
      ],
      [
        {
          id: 1,
          breadId: 1,
          quantity: 2,
        },
        {
          id: 2,
          breadId: 2,
          quantity: 1,
        },
      ],
    ],
    cart: [
      {
        breadId: 1,
        quantity: 2,
      },
      {
        breadId: 2,
        quantity: 1,
      },
    ],
  },
  {
    id: 2,
    firstName: "Bob",
    lastName: "Johnson",
    email: "bob@test.com",
    password: "password",
    img: "http://picsum.photos/200/200",
    purchases: [
      [
        {
          id: 1,
          breadId: 3,
          quantity: 3,
        },
        {
          id: 2,
          breadId: 4,
          quantity: 1,
        },
      ],
    ],
    cart: [
      {
        breadId: 3,
        quantity: 3,
      },
      {
        breadId: 4,
        quantity: 1,
      },
    ],
  },
  {
    id: 3,
    firstName: "Charlie",
    lastName: "Williams",
    email: "charlie@test.com",
    password: "password",
    img: "http://picsum.photos/200/200",
    purchases: [
      [
        {
          id: 1,
          breadId: 5,
          quantity: 1,
        },
      ],
    ],
    cart: [
      {
        breadId: 5,
        quantity: 1,
      },
    ],
  },
];
