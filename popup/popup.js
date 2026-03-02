document.addEventListener('DOMContentLoaded', () => {
    loadSettings();
    loadStats();
    init();
});


function init() {
    const thresholdSlider = document.getElementById('threshold');
    const thresholdVal = document.getElementById('threshold-val');
    const saveBtn = document.getElementById('save');
    const statusDiv = document.getElementById('status');

    thresholdSlider.addEventListener('input', (e) => {
        thresholdVal.textContent = e.target.value;
    });

    ['twitter', 'reddit', 'linkedin'].forEach(p => {
        document.getElementById(`pt_${p}`).addEventListener('input', (e) => {
            document.getElementById(`pt_${p}_val`).textContent = e.target.value;
        });
    });

    saveBtn.addEventListener('click', () => {
        const raw_whitelist = document.getElementById('whitelist').value;
        const settings = {
            enabled: document.getElementById('enabled').checked,
            threshold: parseFloat(document.getElementById('threshold').value),
            block_anger: document.getElementById('block_anger').checked,
            block_sadness: document.getElementById('block_sadness').checked,
            block_toxic: document.getElementById('block_toxic').checked,
            whitelist: raw_whitelist.split('\n').map(s => s.trim().toLowerCase()).filter(s => s.length > 0),
            platform_thresholds: {
                twitter: parseFloat(document.getElementById('pt_twitter').value),
                reddit: parseFloat(document.getElementById('pt_reddit').value),
                linkedin: parseFloat(document.getElementById('pt_linkedin').value)
            }
        };

        chrome.storage.sync.set(settings, () => {
            statusDiv.textContent = 'saved!';
            statusDiv.style.color = '#1DB954';

            setTimeout(() => {
                statusDiv.textContent = '';
            }, 2000);
        });
    });

    document.getElementById('clear-stats').addEventListener('click', () => {
        chrome.storage.local.set({ stats: { total: 0, anger: 0, sadness: 0, toxic: 0 } }, () => {
            loadStats();
            console.log('stats cleared');
        });
    });
}


function loadStats() {
    chrome.storage.local.get(['stats'], (result) => {
        const s = result.stats || { total: 0, anger: 0, sadness: 0, toxic: 0 };
        document.getElementById('stat-total').textContent = s.total;
        document.getElementById('stat-anger').textContent = s.anger;
        document.getElementById('stat-sadness').textContent = s.sadness;
        document.getElementById('stat-toxic').textContent = s.toxic;
    });
}


function loadSettings() {
    chrome.storage.sync.get([
        'enabled',
        'threshold',
        'block_anger',
        'block_sadness',
        'block_toxic',
        'whitelist',
        'platform_thresholds'
    ], (result) => {
        document.getElementById('enabled').checked = result.enabled ?? true;
        document.getElementById('threshold').value = result.threshold ?? -2.0;
        document.getElementById('threshold-val').textContent = result.threshold ?? -2.0;
        document.getElementById('block_anger').checked = result.block_anger ?? true;
        document.getElementById('block_sadness').checked = result.block_sadness ?? false;
        document.getElementById('block_toxic').checked = result.block_toxic ?? true;
        document.getElementById('whitelist').value = (result.whitelist || []).join('\n');
        const pt = result.platform_thresholds || { twitter: -2.0, reddit: -2.5, linkedin: -1.5 };
        document.getElementById('pt_twitter').value = pt.twitter;
        document.getElementById('pt_twitter_val').textContent = pt.twitter;
        document.getElementById('pt_reddit').value = pt.reddit;
        document.getElementById('pt_reddit_val').textContent = pt.reddit;
        document.getElementById('pt_linkedin').value = pt.linkedin;
        document.getElementById('pt_linkedin_val').textContent = pt.linkedin;
    });
}
