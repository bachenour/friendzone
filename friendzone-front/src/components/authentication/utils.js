export const openSession = (data) => {
    sessionStorage.setItem('firstName', data.firstName);
    sessionStorage.setItem('username', data.username);
    sessionStorage.setItem('email', data.email);
    sessionStorage.setItem('sex', data.sex);
    sessionStorage.setItem('age', data.age);
    sessionStorage.setItem('city', data.city);
}