const API_KEY = 'AIzaSyAbBIyID9O1HqSqpt-09aR1VrtH3vBHY7E';

const Listurl = [];
let time = 'm|6';
let viewpoint = 20000;
let subpoint = 'n|2000'
// https://www.magetop.com/blog/cach-lay-api-key-youtube/
// ytb API key AIzaSyAbBIyID9O1HqSqpt-09aR1VrtH3vBHY7E
async function videoinfo(videoid = 'kf0Pzw7cNO8') {
  let response = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoid}&key=${API_KEY}`
  );
  const responseText = await response.text();
  const res = JSON.parse(responseText)
  let viewCount = parseInt(res.items[0].statistics.viewCount);
  let likeCount = parseInt(res.items[0].statistics.likeCount);
  let published = res.items[0].snippet.publishedAt;
  let channelId = res.items[0].snippet.channelId
  return { viewCount, likeCount, published, channelId };
}

async function getChannelSubscriberCount(channelId) {
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${API_KEY}`
  );
  const data = await response.json();

  if (data.items && data.items.length > 0) {
    return data.items[0].statistics.subscriberCount;
  } else {
    return null;
  }
};

const infovideo = async (element, eleconfig = {}) => {
  let videoid = element.querySelector(eleconfig.videoid)?.href?.split('v=')[1]?.split('&')[0] ?? eleconfig.videoid;
  if (Listurl.includes(videoid)) return;
  Listurl.push(videoid);
  let { viewCount, likeCount, published, channelId } = await videoinfo(videoid);
  let channelsub = parseInt(await getChannelSubscriberCount(channelId));
  let publishedDate = new Date(published);
  let uploadDate = publishedDate.getDate() + "/" + (publishedDate.getMonth() + 1) + "/" + publishedDate.getFullYear();
  let metadataline = element.querySelector(eleconfig.metadataline) ?? eleconfig.metadataline;
  let view = metadataline.querySelectorAll(eleconfig.view) ?? eleconfig.view;
  view[0].textContent = viewCount.toLocaleString();
  view[1].textContent = uploadDate + ` Sub: ${channelsub.toLocaleString()}`;
  let videoTitle = element.querySelector(eleconfig.videoTitle) ?? eleconfig.videoTitle;

  if (settime(time, publishedDate) && viewCount > viewpoint && setdub(subpoint, channelsub)) {
    videoTitle.textContent += `view ${viewCount.toLocaleString()} | like ${likeCount.toLocaleString()} | upload ${uploadDate} | Sub: ${channelsub}`; // Thêm thông tin vào title video
    videoTitle.setAttribute('aria-label', videoTitle.textContent);
    videoTitle.style.color = '#1DAB6F'; // Thay #ff0000 bằng mã màu của bạn
  }
}
function setdub(subpoint, channelsub) {
  let query = subpoint.split('|')[0];
  switch (query) {
    case 'l':
      return channelsub >= parseInt(subpoint.split('|')[1]);
    case 'n':
      return channelsub <= parseInt(subpoint.split('|')[1]);
    default:
      break;
  }
  return false;
}
function settime(time, publishedDate) {
  let currentDate = new Date();
  let query = time.split('|')[0];
  let timepoint = new Date();

  switch (query) {
    case 'd':
      timepoint.setDay(currentDate.getDay() - parseInt(time.split('|')[1]));
      return publishedDate >= timepoint
    case 'm':
      timepoint.setMonth(currentDate.getMonth() - parseInt(time.split('|')[1]));
      return publishedDate >= timepoint
    case 'y':
      timepoint.setFullYear(currentDate.getFullYear() - parseInt(time.split('|')[1]));
      return publishedDate >= timepoint
    default:
      break;
  }
  return false;
}

async function fistRunWatch() {
  let secondaryNode = document.querySelector('#secondary-inner');
  let listvideo = secondaryNode.querySelectorAll('ytd-compact-video-renderer');
  listvideo.forEach(async (element) => {
    eleconfig = {
      videoid: '.yt-simple-endpoint.style-scope.ytd-compact-video-renderer',
      metadataline: '#metadata-line',
      view: '.inline-metadata-item.ytd-video-meta-block',
      videoTitle: '#video-title'
    }
    await infovideo(element, eleconfig);
  });
}

async function fistRunSearch() {
  let secondaryNode = document.querySelector('ytd-search');
  let listvideo = secondaryNode.querySelectorAll('ytd-video-renderer');
  listvideo.forEach(async (element) => {
    eleconfig = {
      videoid: 'a#video-title',
      metadataline: '#metadata-line',
      view: '.inline-metadata-item.ytd-video-meta-block',
      videoTitle: 'a#video-title'
    }
    await infovideo(element, eleconfig);
  });
}

function mutationSv(partennode, childnode, eleconfig) {
  // Lấy element cần theo dõi
  let targetNode = document.querySelector(partennode);

  // Tạo một observer instance
  let observer = new MutationObserver(function (mutations) {
    mutations.forEach(mutation => {
      if (mutation.type === 'childList') {
        let addedNodes = mutation.addedNodes;
        addedNodes.forEach(node => {
          if (node.nodeName.toLowerCase() === childnode) {
            console.log('Node ytd-compact-video-renderer được thêm vào:', node);
            
            infovideo(node, eleconfig);
          }
        });
      }
    });
  });
  // Cấu hình observer: chỉ theo dõi thay đổi childList
  let config = { childList: true, subtree: true };
  // Bắt đầu quá trình theo dõi
  observer.observe(targetNode, config);
}
if (window.location.href.includes('watch?v')) {
  eleconfig = {
    videoid: '.yt-simple-endpoint.style-scope.ytd-compact-video-renderer',
    metadataline: '#metadata-line',
    view: '.inline-metadata-item.ytd-video-meta-block',
    videoTitle: '#video-title'
  }
  mutationSv('#secondary-inner', 'ytd-compact-video-renderer', eleconfig)
  await fistRunWatch();
} else if (window.location.href.includes('results?search_query=')) {
  eleconfig = {
    videoid: 'a#video-title',
    metadataline: '#metadata-line',
    view: '.inline-metadata-item.ytd-video-meta-block',
    videoTitle: 'a#video-title'
  }
  mutationSv('ytd-search', 'ytd-video-renderer', eleconfig)
  await fistRunSearch();
}

