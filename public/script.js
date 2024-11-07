function toggleMenu() {
  const navMenu = document.getElementById('navMenu');
  navMenu.classList.toggle('active');
  const hamburger = document.getElementById('hamburger');
  hamburger.classList.toggle('open');
}

function generateSkillMatrix() {
  const username = document.getElementById('username').value;
  const theme = document.getElementById('theme').value;
  const resultDiv = document.getElementById('result');

  if (!username) {
    showNotification("Please enter a GitHub username.");
    return;
  }

  const url = `https://github-skill-matrix.onrender.com/api/skills/${username}/${theme}`;
  resultDiv.innerHTML = `<p>Generating your skill matrix...</p>`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.blob();
    })
    .then(blob => {
      const imgURL = URL.createObjectURL(blob);
      resultDiv.innerHTML = `
        <a href="${url}" target="_blank">
          <img src="${imgURL}" alt="Skill Matrix for ${username}" class="result-image">
        </a>
      `;
    })
    .catch(error => {
      resultDiv.innerHTML = `<p>Error: ${error.message}</p>`;
    });
}

function showNotification(message) {
  const notification = document.getElementById('notification');
  const notificationMessage = document.getElementById('notification-message');
  notificationMessage.textContent = message;
  notification.classList.remove('hidden');
  notification.classList.add('show');

  setTimeout(() => {
    notification.classList.remove('show');
    notification.classList.add('hidden');
  }, 3000);

  document.getElementById('close-notification').onclick = function() {
    notification.classList.remove('show');
    notification.classList.add('hidden');
  };
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const customDropdown = document.querySelector('.custom-dropdown');
  const select = customDropdown.querySelector('select');
  const selectStyled = document.createElement('div');
  selectStyled.className = 'select-styled';
  selectStyled.textContent = select.options[select.selectedIndex].textContent;
  customDropdown.appendChild(selectStyled);

  const optionsList = document.createElement('ul');
  optionsList.className = 'select-options';
  customDropdown.appendChild(optionsList);

  for (let i = 0; i < select.options.length; i++) {
    const option = document.createElement('li');
    option.textContent = select.options[i].textContent;
    option.setAttribute('rel', select.options[i].value);
    optionsList.appendChild(option);
  }

  selectStyled.addEventListener('click', function(e) {
    e.stopPropagation();
    this.classList.toggle('active');
    optionsList.style.display = this.classList.contains('active') ? 'block' : 'none';
  });

  optionsList.addEventListener('click', function(e) {
    e.stopPropagation();
    selectStyled.textContent = e.target.textContent;
    selectStyled.classList.remove('active');
    select.value = e.target.getAttribute('rel');
    optionsList.style.display = 'none';
  });

  document.addEventListener('click', function() {
    selectStyled.classList.remove('active');
    optionsList.style.display = 'none';
  });
});