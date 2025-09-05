<script>
async function loadCVData() {
    try {
        const response = await fetch('cv-data.json'); // Fetch external JSON
        const cvData = await response.json();
        updateCV(cvData);
    } catch (error) {
        console.error('Failed to load CV data:', error);
    }
}

// Update the CV content
function updateCV(data) {
    document.getElementById('cv-name').textContent = data.name;
    document.getElementById('cv-email').textContent = data.email;
    document.getElementById('cv-phone').textContent = data.phone;
    document.getElementById('cv-address').textContent = data.address;
    document.getElementById('cv-linkedin').href = data.linkedin;
    document.getElementById('cv-github').href = data.github;
    document.getElementById('cv-summary').textContent = data.summary;
    document.getElementById('cv-last-updated').textContent = data.last_updated;

    // Education
    const eduContainer = document.getElementById('cv-education');
    data.education.forEach(edu => {
        eduContainer.innerHTML += `
            <div class="item">
                <div class="item-header">
                    <span class="item-title">${edu.title}</span>
                    <span class="item-date">${edu.date}</span>
                </div>
                <div class="item-subtitle">${edu.institution}</div>
            </div>
        `;
    });

    // Skills
    const skillsContainer = document.getElementById('cv-skills');
    data.skills.forEach(skill => {
        skillsContainer.innerHTML += `
            <div class="skill-category">
                <h4><i class="fas fa-tools"></i>${skill.category}</h4>
                <p>${skill.items}</p>
            </div>
        `;
    });

    // Experience
    const expContainer = document.getElementById('cv-experience');
    data.professional_experience.forEach(exp => {
        expContainer.innerHTML += `
            <div class="item">
                <div class="item-header">
                    <span class="item-title">${exp.title} - ${exp.company}</span>
                    <span class="item-date">${exp.date}</span>
                </div>
                <div class="item-description">
                    <ul>
                        ${exp.description.map(d => `<li>${d}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
    });

    // Certifications
    const certContainer = document.getElementById('cv-certifications');
    data.certifications.forEach(cert => {
        certContainer.innerHTML += `<span class="badge">${cert}</span>`;
    });

    // Languages
    const langContainer = document.getElementById('cv-languages');
    data.languages.forEach(lang => {
        langContainer.innerHTML += `
            <div class="language-item">
                <span class="language-name">${lang.name}</span>
                <span class="language-level">${lang.level}</span>
            </div>
        `;
    });
}

document.addEventListener('DOMContentLoaded', loadCVData);
</script>
