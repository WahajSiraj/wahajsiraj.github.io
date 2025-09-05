async function loadCV(file = 'data/cv1.yaml') {
  const response = await fetch(file);
  const yamlText = await response.text();
  const data = jsyaml.load(yamlText);

  document.getElementById('cv-title').innerText = `${data.name} - CV`;
  document.getElementById('cv-name').innerText = data.name;
  document.getElementById('cv-email').innerText = data.email;
  document.getElementById('cv-email').href = `mailto:${data.email}`;
  document.getElementById('cv-phone').innerText = data.phone;
  document.getElementById('cv-address').innerText = data.address;
  document.getElementById('cv-linkedin').innerText = "LinkedIn";
  document.getElementById('cv-linkedin').href = data.linkedin;
  document.getElementById('cv-github').innerText = "GitHub";
  document.getElementById('cv-github').href = data.github;
  document.getElementById('cv-summary').innerText = data.summary;
  document.getElementById('cv-last-updated').innerText = data.last_updated;

  // Education
  const eduContainer = document.getElementById('cv-education');
  eduContainer.innerHTML = "";
  data.education.forEach(item => {
    eduContainer.innerHTML += `<p><strong>${item.title}</strong> - ${item.institution} <em>(${item.date})</em></p>`;
  });

  // Skills
  const skillContainer = document.getElementById('cv-skills');
  skillContainer.innerHTML = "";
  data.skills.forEach(skill => {
    skillContainer.innerHTML += `<p><strong>${skill.category}:</strong> ${skill.items}</p>`;
  });

  // Experience
  const expContainer = document.getElementById('cv-experience');
  expContainer.innerHTML = "";
  data.professional_experience.forEach(job => {
    expContainer.innerHTML += `<p><strong>${job.title}</strong> at ${job.company} <em>(${job.date})</em></p>
                               <ul>${job.description.map(d => `<li>${d}</li>`).join('')}</ul>`;
  });
}

const params = new URLSearchParams(window.location.search);
const cvFile = params.get('cv') ? `data/${params.get('cv')}` : 'data/cv1.yaml';
loadCV(cvFile);
