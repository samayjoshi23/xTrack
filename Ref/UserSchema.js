const users = {
  uid: "GUID",
  userName: "first last",
  email: "user@gmail.com",
  appId: "@ + FirstName+lastName(4 letters) + 5 digit random number",
  transactions: [
    {
      tId: "GUID",
      date: "",
      userId: "",
      categoryId: 1,
    }
  ],
};

const transaction = {
  id: 1,
  userId: 'GUID',
  title: "Transaction Title",
  description: "desc",
  amount: 1000.23,
  type: 'income | expense',
  categoryId : 2,
  isActive: true,
  dateCreated: new Date(),
  dateModified: null,
}

const categories = {
  id: 1,
  userId: 'GUID',
  name: 'Category Name',
  icon: 'icon class',
  dateCreated: '',
  isActive: true,
  isDefault : true
}