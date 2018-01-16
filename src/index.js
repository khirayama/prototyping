import RealTimeCamera from './real-time-camera';
import Filter from './filter';

window.addEventListener('DOMContentLoaded', () => {
  let realTimeCamera = null;
  let filter = new Filter();

  if (navigator.getUserMedia) {
    const canvas = document.querySelector('#canvas');
    const size = Math.min(600, window.parent.screen.width, window.innerWidth);
    canvas.width = size;
    canvas.height = size;
    realTimeCamera = new RealTimeCamera(canvas, {
      // FYI: video: {width: number, height: number} is not supported in Safari
      video: {
        aspectRatio: 1,
        width: {
          ideal: 2560,
        },
        facingMode: {
          exact: 'environment',
        },
      },
      frameRate: {
        ideal: 25,
        max: 50,
      },
    });
  }

  const filterButtons = document.querySelectorAll('.filter-button');
  for (let i = 0; i < filterButtons.length; i++) {
    const filterButton = filterButtons[i];
    const filterName = filterButton.dataset.filtername;
    filterButton.addEventListener('click', () => {
      switch (filterName) {
        case 'amoro': {
          filter.amoro();
          break;
        }
        case 'mayfair': {
          filter.mayfair();
          break;
        }
        case 'rise': {
          filter.rise();
          break;
        }
        case 'hudson': {
          filter.hudson();
          break;
        }
        case 'valencia': {
          filter.valencia();
          break;
        }
        case 'xPro2': {
          filter.xPro2();
          break;
        }
        case 'sierra': {
          filter.sierra();
          break;
        }
        case 'willow': {
          filter.willow();
          break;
        }
        case 'loFi': {
          filter.loFi();
          break;
        }
        default: {
          filter.none();
          break;
        }
      }
      realTimeCamera.setFilter(filter.apply.bind(filter));
    });
  }

  const snapshotButton = document.querySelector('.snapshot-button');
  snapshotButton.addEventListener('click', () => {
    if (realTimeCamera.isPaused()) {
      realTimeCamera.start();
      snapshotButton.innerText = 'SNAPSHOT';
    } else {
      realTimeCamera.snapshot('png', `snapshot_${new Date().getTime()}.png`);
      realTimeCamera.pause();
      snapshotButton.innerText = 'RETRY';
    }
  });
});
