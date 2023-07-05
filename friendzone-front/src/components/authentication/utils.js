export const openSession = (data) => {
    localStorage.setItem("token", data.token);
    sessionStorage.setItem('firstName', data.name+' '+data.full_name);
    sessionStorage.setItem('username', data.pseudo);
    sessionStorage.setItem('email', data.email);
    sessionStorage.setItem('sex', data.sex);
    sessionStorage.setItem('age', data.age);
    sessionStorage.setItem('city', data.city);
}

export const closeSession = () => {
    sessionStorage.clear();
    window.location.reload();
}