<template>
  <nav class="mynav">
    <div class="navbar">
      <div class="navbar__logo">
        <a href="#" class="navbar__logo--link">MPW</a>
        My portfolio website
      </div>
      <div class="navbar__nav">
        <ul>
          <li>Home</li>
          <li>
            <input type="text" placeholder="Enter username" />
          </li>
          <li>About</li>
        </ul>
      </div>
      <div class="navbar__user">
        <div class="navbar__user--photo">
          <p>AS</p>
        </div>
        <div class="navbar__user--name">
          <!-- <img src="" alt=""> -->
          <p>Akande Saheed</p>
        </div>
      </div>
      <div class="navbar__logout">
        <a href>Logout</a>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Header"
};
</script>

<style scoped>
.mynav {
  background: white;
  color: black;
  box-shadow: 1px 0px 10px rgba(71, 71, 71, 0.1),
    2px 0px 10px rgba(71, 71, 71, 0.1);
  z-index: 10;
}

.navbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-evenly;
  padding-top: 10px;
  padding-bottom: 10px;
}

.navbar__logo--link {
  text-decoration: none;
  color: black;
  font-weight: bold;
  font-size: 18px;
}

.navbar__logo--link:hover {
  text-decoration: none;
  color: #000000;
}

.navbar__intro {
  font-size: 14px;
  font-weight: bold;
}

.navbar__intro span {
  color: #9b9b9b;
}

.navbar__user {
  display: flex;
  align-self: center;
  margin-right: 30px;
}

.navbar__user--photo {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: var(--color-grey-dark-2);
  position: relative;
  margin-right: 10px;
}
.navbar__user--photo p {
  font-size: 14px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #ffffff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.navbar__user--name {
  font-size: 14px;
  align-self: center;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #4a4a4a;
}
</style>