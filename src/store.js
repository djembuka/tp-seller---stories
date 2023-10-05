const Store = {
  state() {
    return {
      localStorageObject: window.localStorage.sellerStoriesObject
        ? JSON.parse(window.localStorage.sellerStoriesObject)
        : {},
      modalWin: {
        isOpen: false,
      },
      slider: {
        timeoutId: undefined,
        speed: 3000,
      },
      swiper: {
        instance: null,
        speed: 300,
      },
      stories: [
        {
          id: '789',
          preview: {
            img: '/upload/stories.jpg',
            text:
              'Название первой истории, оно может быть в три строчки текста, но не более',
          },
          card: {
            info: {
              avatar: '/upload/avatar.jpg',
              text:
                'Регулярная езда на велосипеде имеет ряд преимуществ. Название первой истории, оно может быть в три строчки текста, но не более.',
              url: '/',
            },
            items: [
              {
                type: 'video',
                src: '/upload/flowers.mp4',
                active: false,
              },
              {
                type: 'img',
                src: '/upload/stories2.jpg',
                active: false,
              },
              {
                type: 'img',
                src: '/upload/stories3.jpg',
                active: false,
              },
              {
                type: 'video',
                src: '/upload/flowers.mp4',
                active: false,
              },
              {
                type: 'video',
                src: '/upload/flowers2.mp4',
                active: false,
              },
            ],
          },
          active: false,
          watched: false,
        },
        {
          id: '456',
          preview: {
            img: '/upload/stories2.jpg',
            text: 'Регулярная езда на велосипеде имеет ряд преимуществ.',
          },
          card: {
            info: {
              avatar: '/upload/avatar.jpg',
              text:
                'Регулярная езда на велосипеде имеет ряд преимуществ. Название первой истории, оно может быть в три строчки текста, но не более.',
              url: '/',
            },
            items: [
              {
                type: 'img',
                src: '/upload/stories2.jpg',
                active: false,
              },
              {
                type: 'video',
                src: '/upload/flowers.mp4',
                active: false,
              },
            ],
          },
          active: false,
          watched: false,
        },
        {
          id: '123',
          preview: {
            img: '/upload/stories3.jpg',
            text:
              'При регулярной езде в течение часа вы сможете не только получить.',
          },
          card: {
            info: {
              avatar: '/upload/avatar.jpg',
              text:
                'Регулярная езда на велосипеде имеет ряд преимуществ. Название первой истории, оно может быть в три строчки текста, но не более.',
              url: '/',
            },
            items: [
              {
                type: 'img',
                src: '/upload/stories3.jpg',
                active: false,
              },
            ],
          },
          active: false,
          watched: false,
        },
        {
          id: '741',
          preview: {
            img: '/upload/stories4.jpg',
            text:
              'Далеко не все потребители знают о том, что можно купить велосипед в интернет-магазине.',
          },
          card: {
            info: {
              avatar: '/upload/avatar.jpg',
              text:
                'Регулярная езда на велосипеде имеет ряд преимуществ. Название первой истории, оно может быть в три строчки текста, но не более.',
              url: '/',
            },
            items: [
              {
                type: 'img',
                src: '/upload/stories4.jpg',
                active: false,
              },
            ],
          },
          active: false,
          watched: false,
        },
        {
          id: '852',
          preview: {
            img: '/upload/stories5.jpg',
            text:
              'Новые впечатления от прогулки, но и улучшить физическую форму.',
          },
          card: {
            info: {
              avatar: '/upload/avatar.jpg',
              text:
                'Регулярная езда на велосипеде имеет ряд преимуществ. Название первой истории, оно может быть в три строчки текста, но не более.',
              url: '/',
            },
            items: [
              {
                type: 'img',
                src: '/upload/stories5.jpg',
                active: false,
              },
            ],
          },
          active: false,
          watched: false,
        },
        {
          id: '963',
          preview: {
            img: '/upload/stories7.jpg',
            text: 'Goetze - это стильный городской велосипед.',
          },
          card: {
            info: {
              avatar: '/upload/avatar.jpg',
              text:
                'Регулярная езда на велосипеде имеет ряд преимуществ. Название первой истории, оно может быть в три строчки текста, но не более.',
              url: '/',
            },
            items: [
              {
                type: 'img',
                src: '/upload/stories7.jpg',
                active: false,
              },
              {
                type: 'img',
                src: '/upload/stories6.jpg',
                active: false,
              },
              {
                type: 'img',
                src: '/upload/stories5.jpg',
                active: false,
              },
            ],
          },
          active: false,
          watched: false,
        },
      ],
    };
  },
  getters: {
    activeStoryIndex(state) {
      return state.stories.findIndex((s) => s.active);
    },
  },
  mutations: {
    modalOpenHide(state, payload) {
      state.modalWin.isOpen = payload;
    },
    setItemActive(state, payload) {
      let activeCardItem = state.stories[payload.storyIndex].card.items.find(
        (i) => i.active
      );
      if (activeCardItem) {
        activeCardItem.active = false;
      }

      let newActiveCardItem =
        state.stories[payload.storyIndex].card.items[payload.itemIndex];
      if (newActiveCardItem) {
        setTimeout(() => {
          //to make animation visible for visited items
          newActiveCardItem.active = true;
        }, 100);
      }
    },
    setStoryActive(state, storyIndex) {
      let activeStory = state.stories.find((s) => s.active);
      if (activeStory) {
        activeStory.active = false;
      }
      if (storyIndex !== undefined && state.stories[storyIndex]) {
        state.stories[storyIndex].active = true;
      }
    },
    setStoryWatched(state, payload) {
      if (state.stories[payload]) {
        state.stories[payload].watched = true;
      }
    },
    setSliderTimeoutId(state, payload) {
      payload
        ? (state.slider.timeoutId = payload)
        : clearTimeout(state.slider.timeoutId);
    },
    setLocalStorageObject(state, payload) {
      state.localStorageObject[payload] = 'watched';
      window.localStorage.sellerStoriesObject = JSON.stringify(
        state.localStorageObject
      );
    },
    setSwiper(state, payload) {
      state.swiper.instance = payload;
    },
  },
  actions: {
    next({ state, getters, commit, dispatch }) {
      commit('setSliderTimeoutId'); //clear
      let storyIndex = getters.activeStoryIndex;
      let story = state.stories[storyIndex];
      let itemIndex = story.card.items.findIndex((i) => i.active);
      let nextFlag = true;

      //increment
      if (story.card.items[itemIndex + 1]) {
        commit('setItemActive', {
          storyIndex: storyIndex,
          itemIndex: itemIndex + 1,
        });
      } else if (state.stories[storyIndex + 1]) {
        commit('setStoryActive', storyIndex + 1);
        commit('setItemActive', {
          storyIndex: storyIndex + 1,
          itemIndex: 0,
        });
        //set last story as watched
        commit('setLocalStorageObject', story.id);
        commit('setStoryWatched', storyIndex);
      } else {
        commit('modalOpenHide', false);
        commit('setStoryActive', undefined);
        commit('setSliderTimeoutId', undefined);
        nextFlag = false;
      }

      if (nextFlag) {
        state.slider.timeoutId = setTimeout(() => {
          dispatch('next');
        }, state.slider.speed);
      }
    },
    prev({ state, getters, commit, dispatch }) {
      commit('setSliderTimeoutId'); //clear
      let storyIndex = getters.activeStoryIndex;
      let story = state.stories[storyIndex];
      let itemIndex = story.card.items.findIndex((i) => i.active);

      //decrement
      if (story.card.items[itemIndex - 1]) {
        commit('setItemActive', {
          storyIndex: storyIndex,
          itemIndex: itemIndex - 1,
        });
      } else if (state.stories[storyIndex - 1]) {
        commit('setItemActive', {
          storyIndex: storyIndex,
          itemIndex: -1,
        });
        commit('setStoryActive', storyIndex - 1);
        commit('setItemActive', {
          storyIndex: storyIndex - 1,
          itemIndex: 0,
        });
      }

      state.slider.timeoutId = setTimeout(() => {
        dispatch('next');
      }, state.slider.speed);
    },
    setActive({ commit, dispatch }, storyIndex) {
      commit('setStoryActive', storyIndex);
      commit('setItemActive', {
        storyIndex: storyIndex,
        itemIndex: 0,
      });

      dispatch('next');
    },
  },
};

export default Store;
