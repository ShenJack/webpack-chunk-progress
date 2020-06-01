export function load(loader, webpackChunkName, onProgress) {
  listenerMap.set(webpackChunkName, {
    onProgress,
    loaded: 0,
    total: 1,
    chunks: [],
    chunksMap: {},
  });
  if (listenerMap.size > 0) {
    document.addEventListener("webpack-chunk-progress", event => {
      let {resource} = event.detail;
      const chunkName = extractChunkName(resource.url);

      const listener = listenerMap.get(chunkName);
      if (listener == null) {
        return;
      }

      listener.chunksMap[resource.url] = {
        url: resource.url,
        loaded: resource.loaded,
        total: resource.total,
      };

      let chunkInList = listener.chunks.find(
          item => item && item.url === resource.url,
      );

      if (chunkInList) {
        chunkInList.loaded = resource.loaded;
      } else {
        listener.chunks.push(resource);
      }

      let progress;
      console.log(resource)
      if (!window.hasOwnProperty(__chunk_size_map__)) {
        const loaded = resource.loaded;
        const total = resource.total;
        progress = loaded / total;
      } else {
        //chrome不能推算出资源的总计大小，只能使用load表示加载完的部分资源解压后的大小
        if (resource.total === 0 || !resource.lengthComputable) {
          const total = window.__chunk_size_map__[resource.url];
          const loaded = resource.loaded;
          progress = loaded / total;
        } else {
          //firefox 中， event的loaded是已加载部分的gzip之后的大小，total是gzip总计的大小
          const total = window.__chunk_size_map__[resource.url + '.gz'];
          const loaded = resource.loaded;
          progress = loaded / total;
        }
      }

      listener.onProgress(progress);

      if (progress >= 1) {
        listenerMap.delete(webpackChunkName)
      }

    });
  }
  return new Promise((resolve, reject) => {
    loader()
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
  });
}

const listenerMap = new Map();

function extractChunkName(str) {
  return str.replace("vendors~", "").split(".")[0];
}
