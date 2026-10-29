const leadershipProfiles = [
    {
        name: "Kash Patel",
        title: "Director",
        image: "images/portrait-placeholder.svg",
        alt: "Neutral placeholder portrait for FBI Director Kash Patel",
        biography: ""
    },
    {
        name: "Christopher G. Raia",
        title: "Deputy Director",
        image: "images/portrait-placeholder.svg",
        alt: "Neutral placeholder portrait for FBI Deputy Director Christopher G. Raia",
        biography: ""
    },
    {
        name: "B. Chad Yarbrough",
        title: "Executive Director",
        image: "images/portrait-placeholder.svg",
        alt: "Neutral placeholder portrait for FBI Executive Director B. Chad Yarbrough",
        biography: ""
    },
    {
        name: "Eric Deutcher",
        title: "Chief of Staff",
        image: "images/portrait-placeholder.svg",
        alt: "Neutral placeholder portrait for FBI Chief of Staff Eric Deutcher",
        biography: ""
    }
];

const operationalBranches = [
    {
        name: "National Security Branch",
        director: "Matthew Fodor",
        description: "Coordinates national security work, including counterterrorism, counterintelligence, and intelligence functions."
    },
    {
        name: "Criminal and Cyber Branch",
        director: "Jose A. Perez",
        description: "Brings together criminal and cyber investigations, international operations, and victim services."
    },
    {
        name: "Field Services Response Branch",
        director: "Mark Dargis",
        description: "Supports investigative operations through field services, critical incident response, forensic laboratory work, and operational technology."
    },
    {
        name: "Infrastructure Branch",
        director: "Shannon Parry",
        description: "Provides information management, applications and data, IT infrastructure, and chief information officer functions."
    },
    {
        name: "Human Capital Branch",
        director: "Joshua J. Murphy",
        description: "Supports the Bureau's workforce through human resources, inspection, security, and training functions."
    }
];

const seniorStaff = [
    { name: "Kash Patel", role: "Director" },
    { name: "Christopher G. Raia", role: "Deputy Director" },
    { name: "B. Chad Yarbrough", role: "Executive Director" }
];

const directorOffice = {
    title: "Office of the Director / Deputy Director / Executive Director",
    chiefOfStaff: "Eric Deutcher",
    supportingOffices: [
        "Finance and Facilities Division",
        "Office of Congressional Affairs",
        "Office of EEO Affairs",
        "Office of the General Counsel",
        "Office of the Ombuds",
        "Office of Professional Responsibility",
        "Office of Engagement"
    ]
};

const leadershipGrid = document.querySelector("#leadership-grid");
const branchGrid = document.querySelector("#branch-grid");
const hierarchyLayout = document.querySelector("#hierarchy-layout");

if (leadershipGrid) {
    leadershipGrid.innerHTML = leadershipProfiles.map(profile => `
        <article class="partnership-card leadership-card">
            <img class="leadership-portrait" src="${profile.image}" alt="${profile.alt}" loading="lazy">
            <div class="leadership-card-content">
                <h4>${profile.name}</h4>
                <p class="leadership-title">${profile.title}</p>
                ${profile.biography ? `<p class="leadership-biography">${profile.biography}</p>` : ""}
            </div>
        </article>
    `).join("");
}

if (branchGrid) {
    branchGrid.innerHTML = operationalBranches.map(branch => `
        <article class="partnership-card branch-card">
            <h4>${branch.name}</h4>
            <p class="branch-director">Operations Director: ${branch.director}</p>
            <p>${branch.description}</p>
        </article>
    `).join("");
}

if (hierarchyLayout) {
    hierarchyLayout.innerHTML = `
        <section class="hierarchy-group" aria-label="Senior staff">
            <h4>Senior Staff</h4>
            <div class="hierarchy-items">
                ${seniorStaff.map(person => `
                    <div class="hierarchy-item">
                        <strong>${person.name}</strong>
                        <span>${person.role}</span>
                    </div>
                `).join("")}
            </div>
        </section>
        <section class="hierarchy-group" aria-label="Director's office and supporting offices">
            <h4>${directorOffice.title}</h4>
            <div class="hierarchy-item">
                <strong>${directorOffice.chiefOfStaff}</strong>
                <span>Chief of Staff</span>
            </div>
            <ul class="hierarchy-supporting-list">
                ${directorOffice.supportingOffices.map(office => `<li>${office}</li>`).join("")}
            </ul>
        </section>
        <section class="hierarchy-group" aria-label="Assistant Directors and operational branches">
            <h4>Assistant Directors</h4>
            <div class="hierarchy-items">
                ${operationalBranches.map(branch => `
                    <div class="hierarchy-item">
                        <strong>${branch.name}</strong>
                        <span>Operations Director: ${branch.director}</span>
                    </div>
                `).join("")}
            </div>
        </section>
    `;
}