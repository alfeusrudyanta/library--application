type AdminHomeMenuType = {
  display: string;
  value: string;
};

const adminHomeMenu: AdminHomeMenuType[] = [
  {
    display: 'Borrowed List',
    value: 'borrowed_list',
  },
  {
    display: 'User',
    value: 'user',
  },
  {
    display: 'Book List',
    value: 'book_list',
  },
];

type DummyUserType = {
  id: number;
  name: string;
  phoneNumber: string;
  email: string;
  createdAt: string;
};

const dummyUser: DummyUserType[] = [
  {
    id: 1,
    name: 'John Doe 1',
    phoneNumber: '081234567890',
    email: 'johndoe1@email.com',
    createdAt: '28 Aug 2025, 14:00',
  },
  {
    id: 2,
    name: 'John Doe 2',
    phoneNumber: '081234567890',
    email: 'johndoe2@email.com',
    createdAt: '28 Aug 2025, 14:00',
  },
  {
    id: 3,
    name: 'John Doe 3',
    phoneNumber: '081234567890',
    email: 'johndoe3@email.com',
    createdAt: '28 Aug 2025, 14:00',
  },
  {
    id: 4,
    name: 'John Doe 4',
    phoneNumber: '081234567890',
    email: 'johndoe4@email.com',
    createdAt: '28 Aug 2025, 14:00',
  },
  {
    id: 5,
    name: 'John Doe 5',
    phoneNumber: '081234567890',
    email: 'johndoe5@email.com',
    createdAt: '28 Aug 2025, 14:00',
  },
  {
    id: 6,
    name: 'John Doe 6',
    phoneNumber: '081234567890',
    email: 'johndoe6@email.com',
    createdAt: '28 Aug 2025, 14:00',
  },
  {
    id: 7,
    name: 'John Doe 7',
    phoneNumber: '081234567890',
    email: 'johndoe7@email.com',
    createdAt: '28 Aug 2025, 14:00',
  },
  {
    id: 8,
    name: 'John Doe 8',
    phoneNumber: '081234567890',
    email: 'johndoe8@email.com',
    createdAt: '28 Aug 2025, 14:00',
  },
  {
    id: 9,
    name: 'John Doe 9',
    phoneNumber: '081234567890',
    email: 'johndoe9@email.com',
    createdAt: '28 Aug 2025, 14:00',
  },
  {
    id: 10,
    name: 'John Doe 10',
    phoneNumber: '081234567890',
    email: 'johndoe10@email.com',
    createdAt: '28 Aug 2025, 14:00',
  },
];

export { adminHomeMenu, dummyUser };
