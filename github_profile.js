const githubForm = document.querySelector('.githubForm');
const nameInput = document.querySelector('.nameInput');
const card = document.querySelector('.card');
const loader = document.querySelector('.loader');

githubForm.addEventListener('submit', async event => {
    event.preventDefault();
    const username = nameInput.value;

    if(username){
        try{
            loader.style.display = 'block';
            const userData = await getUserData(username);
            getUserInfo(userData);
            loader.classList.add('hidden');
        }
        catch(error){
            console.error(error);
        }
    }
});

async function getUserData(name){
    const apiUrl = `https://api.github.com/users/${name}`;
    const response = await fetch(apiUrl);

    if(!response.ok){
        card.style.display = "none";
        alert("User not found");
        throw new Error("could not fetch user data");
    }
    return await response.json(); 
}

function getUserInfo(data){
    const { avatar_url, name, login, public_repos, followers, following, html_url } = data;

    card.style.display = "flex";

    const fullname = document.querySelector('.name');
    const username = document.querySelector('.username');
    const image = document.querySelector('.profilePic');
    const reposCount = document.querySelector('.reposCount');
    const followersCount = document.querySelector('.followersCount');
    const followingCount = document.querySelector('.followingCount');

    fullname.textContent = name;
    username.textContent = login;
    image.src = avatar_url;
    reposCount.textContent = public_repos;
    followersCount.textContent = followers;
    followingCount.textContent = following;

    document.querySelector('.link').onclick = () => {
        window.open(html_url, "_blank", "noopener,noreferrer");
    }
    
    username.onclick = () => {
        window.open(html_url, "_blank", "noopener,noreferrer");
    }

}
