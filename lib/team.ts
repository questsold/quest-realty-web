export const teamMembers = [
    { img: 'https://assets.thesparksite.com/uploads/sites/6037/2025/06/Ali-Berry-900x900.fit.png', name: 'Ali Berry', role: 'Broker/Owner' },
    { img: 'https://assets.thesparksite.com/uploads/sites/6037/2025/06/Ronya-Naimi-900x900.fit.png', name: 'Ronya Naimi', role: 'Transaction Coordinator' },
    { img: 'https://assets.thesparksite.com/uploads/sites/6037/2025/06/Samantha-Plonka-900x900.fit.jpeg', name: 'Samantha Plonka', role: 'Agent Success Manager' },
    { img: 'https://assets.thesparksite.com/uploads/sites/6037/2025/06/Matthew-Berney-900x900.fit.jpeg', name: 'Matthew Berney', role: 'Presidents Club Real Estate Advisor' },
    { img: 'https://assets.thesparksite.com/uploads/sites/6037/2025/06/Nick-Kalte-900x900.fit.jpeg', name: 'Nick Kalte', role: 'Executive Real Estate Advisor' },
    { img: 'https://assets.thesparksite.com/uploads/sites/6037/2025/06/Drew-Knobloch-900x900.fit.jpeg', name: 'Drew Knobloch', role: 'Senior Real Estate Advisor' },
    { img: 'https://assets.thesparksite.com/uploads/sites/6037/2025/06/Billy-Miller-900x900.fit.jpeg', name: 'Billy Miller', role: 'Senior Real Estate Advisor' },
    { img: 'https://assets.thesparksite.com/uploads/sites/6037/2025/06/Brittany-Valensky-900x900.fit.jpeg', name: 'Brittany Valensky', role: 'Senior Real Estate Advisor' },
    { img: 'https://assets.thesparksite.com/uploads/sites/6037/2025/06/Avery-Z-Evans-900x900.fit.jpg', name: 'Avery Zyniewicz Evans', role: 'Senior Real Estate Advisor' },
    { img: 'https://assets.thesparksite.com/uploads/sites/6037/2025/06/Brittany-Schreck-900x900.fit.jpg', name: 'Brittany Schreck', role: 'Senior Real Estate Advisor' },
    { img: 'https://assets.thesparksite.com/uploads/sites/6037/2025/07/Screenshot-2025-07-14-at-93855PM-900x900.fit.png', name: 'Matt Cook', role: 'Senior Real Estate Advisor' },
    { img: 'https://assets.thesparksite.com/uploads/sites/6037/2025/06/Jessica-Gladys-900x900.fit.jpg', name: 'Jessica Gladys', role: 'Real Estate Advisor' },
    { img: 'https://assets.thesparksite.com/uploads/sites/6037/2025/06/Patti-Ray-900x900.fit.jpg', name: 'Patti Ray', role: 'Real Estate Advisor' },
    { img: 'https://assets.thesparksite.com/uploads/sites/6037/2025/06/Kachi-Aguwa-900x900.fit.jpg', name: 'Kachi Aguwa', role: 'Real Estate Advisor' },
    { img: 'https://assets.thesparksite.com/uploads/sites/6037/2025/06/Laura-Cutajar-900x900.fit.jpeg', name: 'Laura Cutajar', role: 'Real Estate Advisor' },
    { img: 'https://assets.thesparksite.com/uploads/sites/6037/2025/06/Alexandra-Hannum-900x900.fit.jpeg', name: 'Alexandra Hannum', role: 'Real Estate Advisor' },
    { img: 'https://assets.thesparksite.com/uploads/sites/6037/2025/06/Nadeen-Greek-900x900.fit.png', name: 'Nadeen Greek', role: 'Real Estate Advisor' },
    { img: 'https://assets.thesparksite.com/uploads/sites/6037/2025/07/aragonai-d48b0a67-f3a2-410f-9a13-48d35de1bd8d-900x900.fit.jpeg', name: 'Jeremy LePage', role: 'Real Estate Advisor' },
    { img: 'https://assets.thesparksite.com/uploads/sites/6037/2025/06/Rob-Sinishtaj-900x900.fit.jpg', name: 'Robert Sinishtaj', role: 'Real Estate Advisor' },
    { img: 'https://assets.thesparksite.com/uploads/sites/6037/2025/11/329E1506-900x900.fit.jpg', name: 'Owen Smith', role: 'Real Estate Advisor' },
    { img: 'https://assets.thesparksite.com/uploads/sites/6037/2025/06/Headshot-900x900.fit.png', name: 'Neil Dobson', role: 'Real Estate Advisor' },
    { img: 'https://assets.thesparksite.com/uploads/sites/6037/2025/06/Gabbi-Dubuque-900x900.fit.png', name: 'Gabbi Dubuque', role: 'Real Estate Advisor' },
    { img: 'https://assets.thesparksite.com/uploads/sites/6037/2025/06/Marci-Foglietta-900x900.fit.jpeg', name: 'Marci Foglietta', role: 'Real Estate Advisor' }
];

export function getAgentBySubdomain(subdomain?: string | null) {
    const defaultAgent = {
        name: "Ali Berry",
        role: "Broker/Owner",
        phone: "(248) 955-1403",
        image: "https://assets.thesparksite.com/uploads/sites/6037/2025/06/Ali-Berry-900x900.fit.png"
    };

    if (!subdomain) return defaultAgent;

    const matchedTeamMember = teamMembers.find(m => 
        m.name.toLowerCase().includes(subdomain.toLowerCase()) || 
        m.name.toLowerCase().replace(/\s+/g, '') === subdomain.toLowerCase()
    );

    if (matchedTeamMember) {
        return {
            name: matchedTeamMember.name,
            role: matchedTeamMember.role,
            phone: "(248) 955-1403", // Use office phone or add individual phones later
            image: matchedTeamMember.img || defaultAgent.image
        };
    }

    return defaultAgent;
}
