const API_KEY = "6b07b4aaedmshac4ee30939896f5p19b514jsn88b5d22045fe"; 
const BASE_URL = "https://youtube138.p.rapidapi.com";

async function fetchVideos(query) {
    const url = `${BASE_URL}/search/?q=${query}&hl=en&gl=US`;
    
    const options = {
        method: "GET",
        headers: {
            "X-RapidAPI-Key": API_KEY,
            "X-RapidAPI-Host": "youtube138.p.rapidapi.com"
        }
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        
        if (data.contents) {
            displayVideos(data.contents);
        } else {
            console.error("No videos found");
            document.getElementById("videoContainer").innerHTML = `<p>No videos found</p>`;
        }
        
    } catch (error) {
        console.error("Error fetching videos:", error);
        document.getElementById("videoContainer").innerHTML = `<p>Error fetching videos</p>`;
    }
}

function displayVideos(videos) {
    const container = document.getElementById("videoContainer");
    container.innerHTML = "";

    videos.forEach(item => {
        const videoData = item.video || item;  // Handle cases where the video data is nested

        if (videoData && videoData.title && videoData.thumbnails) {
            const thumbnailUrl = videoData.thumbnails[0]?.url || "https://via.placeholder.com/300";
            const title = videoData.title || "No title available";
            const channel = videoData.author?.title || "Unknown channel";
            
            const videoCard = document.createElement("div");
            videoCard.classList.add("video-card");

            videoCard.innerHTML = `
                <img src="${thumbnailUrl}" alt="${title}">
                <h3>${title}</h3>
                <p>${channel}</p>
            `;
            container.appendChild(videoCard);
        } else {
            console.warn("Invalid video data:", videoData);
        }
    });
}

document.getElementById("searchBtn").addEventListener("click", () => {
    const query = document.getElementById("searchInput").value;
    fetchVideos(query);
});
