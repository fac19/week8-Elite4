function logOut({ redirect }){
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    redirect("/");
}

export default logOut;