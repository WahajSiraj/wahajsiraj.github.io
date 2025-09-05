// script.js

// Load YAML parser
// Make sure to include this in your HTML: 
// <script src="https://cdn.jsdelivr.net/npm/js-yaml@4.1.0/dist/js-yaml.min.js"></script>

async function loadCVData() {
    try {
        const response = await fetch('cv-data.yaml');
        if (!response.ok) {
            throw new Error(`Failed to fetch YAML: ${response.statusText}`);
        }
        const yamlText = await response.text();
        const cvData = jsyaml.load(yamlText);
        updateCV(cvData);
    } catch (error) {
        console.error('Error loading YAML data:', error);
    }
}

function updateCV(data) {
    // Update basic information
    document.getElementById('name').textContent = data.name;
    document.getElementById('email').textContent = data.email;
    document.getElementById('phone').textContent = data.phone;
    document.getElementById('address').textContent = data.address;

    // Update social links
    document.getElementById('linkedin').href = data.linkedin;
    document.getElementById('github').href = data.github;

    // Update summary
    document.getElementById('summary').textContent = data.summary;

    // Update education
    const educationContainer = document.getElementById('education');
    educationContainer.innerHTML = '';
    data.education.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('education-item');
        div.innerHTML = `
            <h3>${item.title}</h3>
            <p>${item.institution}</p>
            <span>${item.date}</span>
        `;
        educationContainer.appendChild(div);
    });

    // Update skills
    const skillsContainer = document.getElementById('skills');
    skillsContainer.innerHTML = '';
    data.skills.forEach(skillGroup => {
        const div = document.createElement('div');
        div.classList.add('skill-category');
        div.innerHTML = `
            <h4>${skillGroup.category}</h4>
            <p>${skillGroup.items.join(', ')}</p>
        `;
        skillsContainer.appendChild(div);
    });

    // Update professional experience
    const experienceContainer = document.getElementById('experience');
    experienceContainer.innerHTML = '';
    data.professional_experience.forEach(job => {
        const div = document.createElement('div');
        div.classList.add('experience-item');
        div.innerHTML = `
            <h3>${job.title} – ${job.company}</h3>
            <span>${job.date}</span>
            <ul>
                ${job.description.map(desc => `<li>${desc}</li>`).join('')}
            </ul>
        `;
        experienceContainer.appendChild(div);
    });

    // Update certifications
    const certificationsContainer = document.getElementById('certifications');
    certificationsContainer.innerHTML = '';
    data.certifications.forEach(cert => {
        const li = document.createElement('li');
        li.textContent = cert;
        certificationsContainer.appendChild(li);
    });

    // Update languages
    const languagesContainer = document.getElementById('languages');
    languagesContainer.innerHTML = '';
    data.languages.forEach(lang => {
        const li = document.createElement('li');
        li.textContent = `${lang.name} – ${lang.level}`;
        languagesContainer.appendChild(li);
    });

    // Update last updated date (if available)
    const lastUpdatedEl = document.getElementById('last-updated');
    if (lastUpdatedEl && data.last_updated) {
        lastUpdatedEl.textContent = `Last updated: ${data.last_updated}`;
    }
}

// Load the CV on page load
document.addEventListener('DOMContentLoaded', loadCVData);
