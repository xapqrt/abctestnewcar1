function analyzeVibe(text, active_cats) {
    if (!text || text.length < 5) return { score: 0, emotion: null };
    
    const txt = text.toLowerCase();
    const words = txt.split(/\s+/);
    
    let score = 0;
    let bad_count = 0;
    let good_count = 0;
    let detected = null;
    
    words.forEach(word => {
        const clean_word = word.replace(/[.,!?;:'"]/g, '');
        
        if (bad_words[clean_word]) {
            const entry = bad_words[clean_word];
            if (!active_cats || active_cats[entry.cat]) {
                score += entry.score;
                bad_count++;
                if (!detected) detected = entry.cat;
            }
        }
        
        if (good_words[clean_word]) {
            score += good_words[clean_word];
            good_count++;
        }
    });
    
    // all caps multiplier but only if theres bad words
    if (text === text.toUpperCase() && text.length > 10 && bad_count > 0) {
        score *= 1.5;
    }
    
    return { score, emotion: detected };
}


function isToxic(text, threshold, active_cats) {
    const { score } = analyzeVibe(text, active_cats);
    return score < threshold;
}


console.log('engine loaded');
