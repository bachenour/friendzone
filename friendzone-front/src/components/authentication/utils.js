export const openSession = (data) => {
    localStorage.setItem("token", data.token);
    sessionStorage.setItem('firstName', data.firstName);
    sessionStorage.setItem('username', data.username);
    sessionStorage.setItem('email', data.email);
    sessionStorage.setItem('sex', data.sex);
    sessionStorage.setItem('age', data.age);
    sessionStorage.setItem('city', data.city);
}

export const closeSession = () => {
    sessionStorage.clear();
    console.log('caca');
    window.location.reload();
}