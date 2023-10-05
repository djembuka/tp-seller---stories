<template>
  <div class="b-stories__placeholder">
    <div class="b-stories__placeholder__item">
      <div class="b-stories__placeholder__img"><div></div></div>
      <div class="b-stories__placeholder__text">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    <div class="b-stories__placeholder__item">
      <div class="b-stories__placeholder__img"><div></div></div>
      <div class="b-stories__placeholder__text">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    <div class="b-stories__placeholder__item">
      <div class="b-stories__placeholder__img"><div></div></div>
      <div class="b-stories__placeholder__text">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    <div class="b-stories__placeholder__item">
      <div class="b-stories__placeholder__img"><div></div></div>
      <div class="b-stories__placeholder__text">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    <div class="b-stories__placeholder__item">
      <div class="b-stories__placeholder__img"><div></div></div>
      <div class="b-stories__placeholder__text">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    <div class="b-stories__placeholder__item">
      <div class="b-stories__placeholder__img"><div></div></div>
      <div class="b-stories__placeholder__text">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<style>
.b-stories__placeholder {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.b-stories__placeholder__item {
  width: calc((100% - 30px * 5) / 6);
}
.b-stories__placeholder__img {
  margin: 0 auto 22px;
  max-width: 128px;
}
.b-stories__placeholder__img div {
  padding-top: 100%;
  border-radius: 50%;
  background-color: #f2f2f2;
}
.b-stories__placeholder__text div {
  height: 5px;
  background-color: #f2f2f2;
  margin-bottom: 7px;
}
.b-stories__placeholder__text div:last-child {
  width: 70%;
  margin: 0 auto;
}
@media (max-width: 767px) {
  .b-stories__placeholder__item {
    width: calc((100vw - 15px * 2 - 10px * 2) / 3);
  }
  .b-stories__placeholder__item:nth-child(1),
  .b-stories__placeholder__item:nth-child(2),
  .b-stories__placeholder__item:nth-child(3) {
    display: none;
  }
}
</style>
