export const getActivityPosition = (index: number, total: number) => {
    const angle = (index / total) * 2 * Math.PI;
    const radius = 30;
    const centerX = 50;
    const centerY = 50;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    return { top: `${y}%`, left: `${x}%` };
  };
  
  export const createLocationInfo = (cases: string[]) => {
    const SAMPLE_ADDRESSES = [
      '360 Rang Saint-Louis, Saint-Fulgence, QC G0V 1S0',
      '1590 Route de Tadoussac, Saint-Félix-d\'Otis, QC G0V 1M0',
      '91 Notre Dame, Rivière-Éternité, QC G0V 1P0',
      '234 Chemin des Érables, Alma, QC G8B 5V2',
      '456 Boulevard Talbot, Chicoutimi, QC G7H 4C1',
      '789 Chemin du Lac, Laterrière, QC G7N 1A1'
    ];
  
    const SAMPLE_ACTIVITIES = [
      ['Randonnée', 'Faune', 'Thématique'],
      ['Pêche', 'Location', 'Guide'],
      ['Formation', 'Excursion', 'Matériel'],
      ['Famille', 'Atelier', 'Découverte']
    ];
  
    const info: Record<string, any> = {};
    cases.forEach((activity, index) => {
      const rating = (4 + Math.random()).toFixed(1);
      const phone = `(418) ${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 9000 + 1000)}`;
      const siteNumber = index + 1;
      info[activity] = {
        name: `Site ${siteNumber}`,
        address: SAMPLE_ADDRESSES[index % SAMPLE_ADDRESSES.length],
        phone,
        website: `www.site${siteNumber}.com`,
        description: `Site ${siteNumber} offrant une expérience unique en pleine nature québécoise.`,
        openHours: '8:00 - 17:00',
        rating: parseFloat(rating),
        activities: SAMPLE_ACTIVITIES[index % SAMPLE_ACTIVITIES.length]
      };
    });
    return info;
  };