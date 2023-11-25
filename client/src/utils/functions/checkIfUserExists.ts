export default async function checkIfUserExists(userId: string) {
  try {
    const res = await fetch(`http://localhost:3000/users/${userId}`);

    if (res.status == 200) {
      return true;
    }
    return false;
  } catch (error) {
    console.error(error);
  }
}
