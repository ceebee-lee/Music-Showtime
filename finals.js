
if (window.performance && performance.navigation.type === 1) {
    window.location.href = "finals.html"; // or "finals.html", etc.
  }

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  history.replaceState(null, null, window.location.pathname);
  }
  
  async function getWeatherAndMusic() {
      const apiKey = '20223410376f10122acb2ba14b0eace1';
      const location = document.getElementById('location').value.trim();
      const weatherDisplay = document.getElementById('weather');
      const musicDisplay = document.getElementById('music');

      if (!location) {
        weatherDisplay.innerHTML = '<span class="text-red-500">Please enter a city name.</span>';
        musicDisplay.innerHTML = '';
        return;
      }

      try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&units=metric&appid=${apiKey}`);
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "City not found or API error");
        }
        const data = await res.json();

        const weatherMain = data.weather[0].main.toLowerCase();
        const temp = data.main.temp;

        weatherDisplay.innerHTML = `Weather in ${location}: ${weatherMain}, ${temp} °C`;
        let playlist = '';

        if (weatherMain.includes('rain')) {
          playlist = `<iframe src="https://open.spotify.com/embed/playlist/37i9dQZF1DXbvABJXBIyiY" width="100%" height="380" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>`;
        } else if (weatherMain.includes('clear')) {
          playlist = `<iframe src="https://open.spotify.com/embed/playlist/37i9dQZF1DX0UrRvztWcAU" width="100%" height="380" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>`;
        } else if (weatherMain.includes('cloud')) {
          playlist = `<iframe src="https://open.spotify.com/embed/playlist/37i9dQZF1DWZeKCadgRdKQ" width="100%" height="380" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>`;
        } else if (weatherMain.includes('snow')) {
          playlist = `<iframe src="https://open.spotify.com/embed/playlist/37i9dQZF1DWUNIrSzKgQbP" width="100%" height="380" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>`;
        } else if (weatherMain.includes('thunderstorm')) {
          playlist = `<iframe src="https://open.spotify.com/embed/playlist/37i9dQZF1DX1tyCD9QhIWF" width="100%" height="380" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>`;
        } else if (weatherMain.includes('drizzle')) {
          playlist = `<iframe src="https://open.spotify.com/embed/playlist/37i9dQZF1DXb0LzD9s1F8d" width="100%" height="380" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>`;
        } else if (weatherMain.includes('mist') || weatherMain.includes('fog')) {
          playlist = `<iframe src="https://open.spotify.com/embed/playlist/37i9dQZF1DX6VdMW310YC7" width="100%" height="380" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>`;
        } else {
          playlist = `<p class='text-gray-700'>No specific playlist found for this weather. Try another city!</p>`;
        }
        musicDisplay.innerHTML = playlist;
      } catch (error) {
        weatherDisplay.innerHTML = `<span class="text-red-500">Error: ${error.message}</span>`;
        musicDisplay.innerHTML = '';
      }
    }