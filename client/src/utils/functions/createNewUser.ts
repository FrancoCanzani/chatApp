export default async function createNewUser(
  displayName: string,
  email: string,
  userId: string
) {
  const newUserData = {
    displayName: displayName,
    email: email,
    userId: userId,
  };
  try {
    const res = await fetch(`http://localhost:3000/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUserData),
    });

    const response = await res.json();
    if (res.ok) {
      return response;
    } else {
      console.log('Error creating user:', response);
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}
