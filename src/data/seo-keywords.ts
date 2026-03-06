// =============================================================================
// YantraQ — SEO Mega-Keyword Database (1000+ keywords)
// =============================================================================
// This file contains a comprehensive keyword strategy covering:
// 1. Brand variations & typos (~60 keywords)
// 2. Product × Action × Location combinators (~500+ generated)
// 3. Service-specific long-tail keywords (~200+)
// 4. Industry-specific keywords (~100+)
// 5. AEO / GEO / Near-me keywords (~100+)
// 6. Dynamic product-based keyword generators
// =============================================================================

// ---------------------------------------------------------------------------
// CATEGORY 1: Brand Variations & Typos
// ---------------------------------------------------------------------------
export const brandKeywords = [
    // Core brand
    'yantraq', 'yantra q', 'yantra-q', 'yantraq.com', 'yantraq pvt ltd',
    'yantraq private limited', 'YANTRAQ', 'YantraQ',
    // Parent "Yantra" variants
    'yantra', 'yantra bhopal', 'yantara', 'yanta', 'yantra hardware',
    'yantra solutions', 'yantra technology', 'yantra IT', 'yantra repair',
    'yantra computers', 'yantra laptops', 'yantra store', 'yantra shop',
    'buy yantra', 'yantra systems', 'yantra devices', 'yantra networking',
    // Common typos & misspellings
    'yantarq', 'yantrak', 'yantrq', 'yantrraq', 'yantraqq', 'yantaq',
    'yantra que', 'yantra queue', 'yantra kue', 'yentraq', 'yantraq1',
    'yantreq', 'yantraeq', 'yontarq', 'yantrac', 'yantrak bhopal',
    'yantarq bhopal', 'yantrq bhopal', 'yantrraq bhopal',
    // Brand + location
    'yantraq bhopal', 'yantra q bhopal', 'yantraq mp', 'yantraq madhya pradesh',
    'yantraq india', 'yantraq bagsewaniya', 'yantraq hoshangabad road',
    'yantraq kolar road', 'yantraq arera colony', 'yantraq mp nagar',
    // Brand + type
    'yantraq IT', 'yantraq hardware', 'yantraq rental', 'yantraq sales',
    'yantraq repair', 'yantraq service center', 'yantraq tech', 'yantraq technology',
    'yantraq solutions', 'yantraq it solutions', 'yantraq digital', 'yantraq software',
    // Brand + entity
    'yantraq store', 'yantraq shop', 'yantraq office', 'yantraq company',
    'yantraq address', 'yantraq contact', 'yantraq phone number', 'yantraq email',
    'yantraq whatsapp', 'yantraq reviews', 'yantraq ratings', 'yantraq google reviews',
    'yantraq website', 'www yantraq com', 'yantraq careers', 'yantraq team',
];

// ---------------------------------------------------------------------------
// CATEGORY 2: Product × Action × Location Combinator Lists
// ---------------------------------------------------------------------------
const products = [
    'laptop', 'desktop', 'server', 'printer', 'CCTV camera', 'IP camera',
    'biometric device', 'fingerprint scanner', 'face recognition system',
    'GPS tracker', 'LED monitor', 'network switch', 'router', 'WiFi router',
    'DVR', 'NVR', 'workstation', 'server rack', 'computer', 'PC',
    'projector', 'UPS', 'scanner', 'firewall', 'access point',
    'surveillance camera', 'PTZ camera', 'dome camera', 'bullet camera',
    'all-in-one desktop', 'mini PC', 'thin client', 'barcode scanner',
    'POS machine', 'intercom system', 'video door phone',
    'network cable', 'LAN cable', 'patch panel', 'rack mount',
    'hard disk', 'SSD', 'RAM', 'keyboard', 'mouse', 'webcam',
    'headset', 'speaker', 'external hard drive', 'pen drive',
    'toner cartridge', 'ink cartridge', 'paper shredder',
    'EPABX system', 'telephone system', 'conference phone',
];

const actions = [
    'buy', 'rent', 'sell', 'repair', 'service', 'install', 'setup',
    'AMC', 'maintenance', 'dealer', 'supplier', 'vendor', 'shop',
    'store', 'price', 'cost', 'rate', 'on rent', 'on lease',
    'for sale', 'near me', 'wholesale', 'bulk', 'refurbished',
];

const locations = [
    'bhopal', 'bhopal MP', 'bhopal madhya pradesh', 'near me',
    'bagsewaniya bhopal', 'hoshangabad road bhopal', 'kolar road bhopal',
    'arera colony bhopal', 'mp nagar bhopal', 'shahpura bhopal',
    'habibganj bhopal', 'new market bhopal', 'bittan market bhopal',
    'govindpura bhopal', 'ayodhya nagar bhopal', 'ashoka garden bhopal',
    'indrapuri bhopal', 'raisen road bhopal', 'berasia road bhopal',
    'lalghati bhopal', 'misrod bhopal', 'mandideep', 'sehore',
    'vidisha', 'raisen', 'madhya pradesh', 'central india',
];

const qualifiers = [
    'best', 'top', 'cheap', 'affordable', 'genuine', 'certified',
    'trusted', 'reliable', 'new', 'used', 'second hand', 'refurbished',
    'branded', 'original', 'enterprise', 'professional', 'commercial',
    'industrial', 'corporate', 'business', 'office',
];

/**
 * Generates product × action × location combo keywords (top combinations only)
 * Produces ~500+ unique keywords from the matrix
 */
export function generateProductKeywords(): string[] {
    const keywords: string[] = [];
    const topProducts = products.slice(0, 20); // Top 20 products
    const topActions = actions.slice(0, 12);    // Top 12 actions
    const topLocations = locations.slice(0, 6); // Top 6 locations

    for (const product of topProducts) {
        for (const action of topActions) {
            // product + action
            keywords.push(`${product} ${action}`);
            // product + action + location
            for (const location of topLocations) {
                keywords.push(`${product} ${action} ${location}`);
            }
        }
        // product + qualifier
        for (const qual of qualifiers.slice(0, 8)) {
            keywords.push(`${qual} ${product}`);
            keywords.push(`${qual} ${product} bhopal`);
        }
    }
    return [...new Set(keywords)];
}

// ---------------------------------------------------------------------------
// CATEGORY 3: Service-Specific Long-Tail Keywords
// ---------------------------------------------------------------------------
export const serviceKeywords = [
    // IT Hardware Sales
    'IT hardware sales bhopal', 'IT hardware shop bhopal', 'IT hardware store bhopal',
    'IT equipment supplier bhopal', 'computer hardware shop bhopal',
    'IT hardware dealer bhopal', 'computer parts shop bhopal',
    'IT hardware wholesaler bhopal', 'IT hardware distributor bhopal',
    'IT products near me', 'IT hardware near me bhopal',
    'computer hardware dealer near me', 'IT equipment near me',
    'buy IT hardware online bhopal', 'IT hardware purchase bhopal',
    'computer accessories shop bhopal', 'IT peripherals bhopal',

    // IT Hardware Rental
    'IT hardware rental bhopal', 'laptop rental bhopal', 'laptop on rent bhopal',
    'laptop on rent near me', 'laptop rent monthly bhopal', 'laptop hire bhopal',
    'laptop on lease bhopal', 'desktop on rent bhopal', 'desktop rental bhopal',
    'server rental bhopal', 'server on rent bhopal', 'server lease bhopal',
    'computer on rent bhopal', 'PC rental bhopal', 'workstation rental bhopal',
    'printer rental bhopal', 'printer on rent bhopal',
    'projector on rent bhopal', 'projector rental bhopal',
    'IT equipment rental bhopal', 'IT equipment on rent bhopal',
    'bulk laptop rental bhopal', 'laptop rental for events bhopal',
    'laptop rental for exams bhopal', 'laptop rental for training bhopal',
    'short term laptop rental bhopal', 'long term laptop rental bhopal',
    'laptop rent per day bhopal', 'laptop rent per month bhopal',
    'IT rental services bhopal', 'computer rental services bhopal',
    'affordable laptop rental bhopal', 'cheap laptop on rent bhopal',

    // Repair & AMC
    'laptop repair bhopal', 'laptop repair near me', 'laptop repair shop bhopal',
    'laptop service center bhopal', 'laptop screen repair bhopal',
    'laptop keyboard repair bhopal', 'laptop motherboard repair bhopal',
    'laptop battery replacement bhopal', 'laptop hinge repair bhopal',
    'desktop repair bhopal', 'desktop repair near me', 'computer repair bhopal',
    'computer repair near me', 'PC repair bhopal',
    'printer repair bhopal', 'printer service bhopal', 'printer repair near me',
    'server repair bhopal', 'server maintenance bhopal',
    'CCTV repair bhopal', 'CCTV camera repair near me',
    'biometric device repair bhopal', 'UPS repair bhopal',
    'data recovery bhopal', 'data recovery service bhopal',
    'virus removal service bhopal', 'malware removal bhopal',
    'OS installation bhopal', 'Windows installation bhopal',
    'software installation service bhopal',
    'annual maintenance contract bhopal', 'AMC services bhopal',
    'IT AMC bhopal', 'computer AMC bhopal', 'laptop AMC bhopal',
    'printer AMC bhopal', 'server AMC bhopal', 'IT maintenance bhopal',
    'IT support bhopal', 'IT support services bhopal',
    'IT helpdesk bhopal', 'onsite IT support bhopal',
    'remote IT support bhopal', 'IT troubleshooting bhopal',

    // CCTV & Surveillance
    'CCTV installation bhopal', 'CCTV camera installation bhopal',
    'CCTV installation near me', 'CCTV camera price bhopal',
    'CCTV camera for home bhopal', 'CCTV camera for office bhopal',
    'CCTV camera for shop bhopal', 'CCTV camera for factory bhopal',
    'CCTV camera for warehouse bhopal', 'CCTV camera for school bhopal',
    'IP camera installation bhopal', 'IP camera setup bhopal',
    'surveillance camera bhopal', 'security camera bhopal',
    'security camera installation bhopal', 'security camera near me',
    'DVR installation bhopal', 'NVR installation bhopal',
    'PTZ camera installation bhopal', 'dome camera bhopal',
    'bullet camera bhopal', 'wireless camera bhopal',
    'night vision camera bhopal', '4K camera bhopal',
    'CCTV dealer bhopal', 'CCTV supplier bhopal', 'CCTV vendor bhopal',
    'best CCTV company bhopal', 'CCTV maintenance bhopal',
    'CCTV AMC bhopal', 'CCTV repair bhopal',

    // Biometric & Access Control
    'biometric attendance system bhopal', 'biometric machine bhopal',
    'fingerprint attendance system bhopal', 'fingerprint scanner bhopal',
    'face recognition system bhopal', 'face recognition attendance bhopal',
    'access control system bhopal', 'door access control bhopal',
    'biometric device price bhopal', 'biometric installation bhopal',
    'attendance machine bhopal', 'time attendance system bhopal',
    'biometric dealer bhopal', 'biometric supplier bhopal',

    // GPS Tracking
    'GPS tracker bhopal', 'GPS tracking device bhopal',
    'vehicle GPS tracker bhopal', 'car GPS tracker bhopal',
    'fleet management bhopal', 'vehicle tracking system bhopal',
    'GPS tracker installation bhopal', 'GPS dealer bhopal',
    'real time tracking bhopal', 'asset tracking bhopal',

    // Networking
    'network installation bhopal', 'network setup bhopal',
    'LAN installation bhopal', 'LAN cabling bhopal',
    'structured cabling bhopal', 'network cabling bhopal',
    'WiFi installation bhopal', 'WiFi setup bhopal',
    'WiFi router bhopal', 'enterprise WiFi bhopal',
    'network switch bhopal', 'managed switch bhopal',
    'firewall installation bhopal', 'network security bhopal',
    'network troubleshooting bhopal', 'network maintenance bhopal',
    'server room setup bhopal', 'IT infrastructure setup bhopal',
    'office network setup bhopal', 'internet setup bhopal',

    // Software & Web Development
    'website development bhopal', 'web development bhopal',
    'web design bhopal', 'website design bhopal',
    'web development company bhopal', 'website development company bhopal',
    'best web developer bhopal', 'website maker bhopal',
    'ecommerce website bhopal', 'ecommerce development bhopal',
    'online store development bhopal', 'shopping website bhopal',
    'mobile app development bhopal', 'app development bhopal',
    'app developer bhopal', 'android app development bhopal',
    'iOS app development bhopal', 'react native developer bhopal',
    'flutter app development bhopal', 'cross platform app bhopal',
    'custom software development bhopal', 'software development company bhopal',
    'software company bhopal', 'IT company bhopal', 'tech company bhopal',
    'CRM development bhopal', 'ERP development bhopal',
    'custom CRM for business bhopal', 'business software solutions bhopal',
    'enterprise resource planning bhopal', 'inventory management software bhopal',
    'billing software development bhopal', 'hospital management system bhopal',
    'school management software bhopal', 'hotel management system bhopal',
    'real estate software bhopal', 'lead management system bhopal',
    'API development bhopal', 'SaaS development bhopal',
    'cloud solutions bhopal', 'cloud computing bhopal',
    'bespoke software development central india', 'software outsourcing bhopal',
    'dedicated developers bhopal', 'hire software engineers bhopal',

    // SEO / AEO / GEO / Digital Marketing
    'SEO services bhopal', 'SEO company bhopal', 'SEO agency bhopal',
    'best SEO services bhopal', 'local SEO bhopal',
    'SEO expert bhopal', 'SEO consultant bhopal',
    'digital marketing bhopal', 'digital marketing company bhopal',
    'digital marketing agency bhopal', 'online marketing bhopal',
    'social media marketing bhopal', 'Google Ads bhopal',
    'PPC services bhopal', 'content marketing bhopal',
    'AEO services bhopal', 'answer engine optimization bhopal',
    'GEO services bhopal', 'generative engine optimization bhopal',
    'voice search optimization bhopal', 'AI search optimization bhopal',
    'Google Business profile bhopal', 'local business SEO bhopal',
];

// ---------------------------------------------------------------------------
// CATEGORY 4: Industry-Specific Keywords
// ---------------------------------------------------------------------------
export const industryKeywords = [
    // Corporate & Office
    'IT solutions for office bhopal', 'office IT setup bhopal',
    'corporate IT services bhopal', 'office computer setup bhopal',
    'office networking bhopal', 'office CCTV bhopal',
    'office biometric bhopal', 'office printer bhopal',
    'startup IT services bhopal', 'startup IT setup bhopal',
    'co-working space IT bhopal', 'new office IT setup bhopal',
    'IT infrastructure for company bhopal', 'enterprise IT bhopal',
    'SME IT solutions bhopal', 'small business IT bhopal',

    // Education
    'IT solutions for schools bhopal', 'school computer lab setup bhopal',
    'computer lab bhopal', 'school CCTV installation bhopal',
    'laptop rental for exams bhopal', 'laptop for students bhopal',
    'school biometric attendance bhopal', 'education IT bhopal',
    'college computer lab bhopal', 'coaching center IT bhopal',
    'smart class setup bhopal', 'digital classroom bhopal',
    'school IT infrastructure bhopal', 'university IT support bhopal',
    'institute laptop rental bhopal', 'exam laptop rental bhopal',

    // Healthcare
    'IT solutions for hospital bhopal', 'hospital CCTV bhopal',
    'hospital IT infrastructure bhopal', 'clinic IT setup bhopal',
    'hospital network bhopal', 'healthcare IT bhopal',
    'hospital server bhopal', 'pharmacy IT setup bhopal',
    'hospital biometric bhopal', 'medical lab IT bhopal',

    // Retail & Showroom
    'POS system bhopal', 'retail IT solutions bhopal',
    'shop CCTV installation bhopal', 'showroom CCTV bhopal',
    'retail barcode system bhopal', 'billing software bhopal',
    'shop security system bhopal', 'retail network setup bhopal',
    'mall CCTV bhopal', 'store IT setup bhopal',

    // Manufacturing & Industrial
    'factory CCTV installation bhopal', 'manufacturing IT bhopal',
    'industrial camera bhopal', 'factory surveillance bhopal',
    'industrial network bhopal', 'plant IT setup bhopal',
    'warehouse CCTV bhopal', 'warehouse IT bhopal',
    'factory biometric bhopal', 'industrial IT solutions bhopal',

    // Government
    'government IT supplier bhopal', 'government IT vendor bhopal',
    'GeM registered vendor bhopal', 'IT hardware for government bhopal',
    'government office IT bhopal', 'PSU IT supplier bhopal',
    'tender IT hardware bhopal', 'government computer supplier bhopal',

    // Banking & Finance
    'bank IT solutions bhopal', 'banking CCTV bhopal',
    'ATM CCTV installation bhopal', 'bank biometric bhopal',
    'banking IT infrastructure bhopal', 'finance IT bhopal',
    'bank server bhopal', 'bank network security bhopal',

    // Hospitality
    'hotel IT solutions bhopal', 'hotel CCTV bhopal',
    'resort CCTV bhopal', 'hotel WiFi setup bhopal',
    'hotel networking bhopal', 'restaurant CCTV bhopal',
    'hospitality IT bhopal', 'hotel POS bhopal',

    // Real Estate & Construction
    'construction site CCTV bhopal', 'real estate CCTV bhopal',
    'site surveillance bhopal', 'society CCTV bhopal',
    'apartment CCTV installation bhopal', 'builder IT solutions bhopal',
    'residential CCTV bhopal', 'gate camera bhopal',

    // Event & Conference
    'laptop rental for event bhopal', 'projector rental for event bhopal',
    'conference setup bhopal', 'seminar IT setup bhopal',
    'exhibition laptop rental bhopal', 'event IT services bhopal',
    'conference room setup bhopal', 'meeting room IT bhopal',
];

// ---------------------------------------------------------------------------
// CATEGORY 5: AEO / GEO / "Near Me" / Question Keywords
// ---------------------------------------------------------------------------
export const aeoGeoKeywords = [
    // "Near me" variations
    'IT hardware near me', 'laptop shop near me', 'computer shop near me',
    'CCTV installation near me', 'laptop repair near me',
    'computer repair near me', 'printer repair near me',
    'biometric shop near me', 'IT store near me',
    'laptop rental near me', 'server shop near me',
    'networking equipment near me', 'IT services near me',
    'computer accessories near me', 'IT company near me',
    'IT solution provider near me', 'hardware shop near me',
    'electronics shop near me', 'tech store near me',

    // Question-based (AEO optimized)
    'where to buy laptop in bhopal', 'where to rent laptop in bhopal',
    'best IT company in bhopal', 'best laptop shop in bhopal',
    'best CCTV installation in bhopal', 'best computer repair in bhopal',
    'laptop rental price in bhopal', 'CCTV camera price in bhopal',
    'server rental cost in bhopal', 'biometric device price in bhopal',
    'how to rent laptop in bhopal', 'how to install CCTV in bhopal',
    'how much laptop rental in bhopal', 'how much CCTV installation cost bhopal',
    'which is best IT company in bhopal', 'which company provides laptop on rent in bhopal',
    'who sells servers in bhopal', 'who repairs laptops in bhopal',
    'what is the cost of CCTV installation in bhopal',
    'what is yantraq', 'what does yantraq do',
    'is yantraq good', 'how to contact yantraq',

    // Comparison & "vs" keywords
    'buy vs rent laptop bhopal', 'new vs refurbished laptop bhopal',
    'CCTV vs IP camera bhopal', 'wired vs wireless camera bhopal',
    'yantraq vs other IT companies bhopal',
    'best IT hardware dealer in bhopal 2024', 'best IT hardware dealer in bhopal 2025',
    'best IT hardware dealer in bhopal 2026',
    'top 10 IT companies bhopal', 'top IT hardware shops bhopal',

    // Hindi transliteration keywords
    'laptop kaha milega bhopal', 'laptop kiraye pe bhopal',
    'computer ki dukaan bhopal', 'CCTV lagwana hai bhopal',
    'laptop khareedna bhopal', 'printer repair kahan hoga bhopal',
    'sasta laptop bhopal', 'laptop EMI bhopal',
    'computer bhopal me', 'laptop bhopal me',

    // Voice search natural language
    'I need a laptop on rent in bhopal',
    'find IT hardware store in bhopal',
    'laptop rental services in bhopal madhya pradesh',
    'affordable IT solutions for my business in bhopal',
    'best place to buy server in bhopal',
    'who provides CCTV installation in bhopal',
    'IT hardware company near bagsewaniya bhopal',
    'laptop repair service near mp nagar bhopal',
];

// ---------------------------------------------------------------------------
// CATEGORY 6: Additional Long-Tail & Seasonal Keywords
// ---------------------------------------------------------------------------
export const additionalKeywords = [
    // Pricing / Budget specific
    'laptop under 20000 bhopal', 'laptop under 30000 bhopal',
    'laptop under 50000 bhopal', 'desktop under 25000 bhopal',
    'desktop under 40000 bhopal', 'cheap laptop bhopal',
    'affordable server bhopal', 'budget computer bhopal',
    'lowest price laptop bhopal', 'best value laptop bhopal',
    'second hand laptop bhopal', 'used laptop bhopal',
    'refurbished laptop bhopal', 'refurbished desktop bhopal',
    'refurbished server bhopal', 'reconditioned laptop bhopal',

    // Brand-specific hardware
    'HP laptop bhopal', 'Dell laptop bhopal', 'Lenovo laptop bhopal',
    'Asus laptop bhopal', 'Acer laptop bhopal', 'Apple MacBook bhopal',
    'HP printer bhopal', 'Canon printer bhopal', 'Epson printer bhopal',
    'Brother printer bhopal', 'Samsung monitor bhopal', 'LG monitor bhopal',
    'HP server bhopal', 'Dell server bhopal', 'Lenovo server bhopal',
    'Cisco router bhopal', 'TP-Link router bhopal', 'D-Link switch bhopal',
    'Hikvision CCTV bhopal', 'Dahua CCTV bhopal', 'CP Plus CCTV bhopal',
    'eSSL biometric bhopal', 'ZKTeco biometric bhopal',
    'APC UPS bhopal', 'Microtek UPS bhopal',
    'Logitech accessories bhopal', 'Microsoft accessories bhopal',

    // Specification-based
    'i3 laptop bhopal', 'i5 laptop bhopal', 'i7 laptop bhopal',
    'i9 laptop bhopal', 'Ryzen 5 laptop bhopal', 'Ryzen 7 laptop bhopal',
    '8GB RAM laptop bhopal', '16GB RAM laptop bhopal', '32GB RAM laptop bhopal',
    '256GB SSD laptop bhopal', '512GB SSD laptop bhopal', '1TB laptop bhopal',
    '2MP CCTV camera bhopal', '4MP CCTV camera bhopal', '5MP CCTV camera bhopal',
    '4K CCTV camera bhopal', '8 channel DVR bhopal', '16 channel DVR bhopal',
    '32 channel NVR bhopal', 'POE switch bhopal', '24 port switch bhopal',
    '48 port switch bhopal', 'gigabit switch bhopal',

    // Use-case specific
    'work from home laptop bhopal', 'gaming laptop bhopal',
    'student laptop bhopal', 'business laptop bhopal',
    'graphic design desktop bhopal', 'video editing PC bhopal',
    'programming laptop bhopal', 'accounting computer bhopal',
    'CAD workstation bhopal', 'rendering PC bhopal',
    'home security camera bhopal', 'office security system bhopal',
    'gate security camera bhopal', 'parking CCTV bhopal',

    // Seasonal / trending
    'laptop for online classes bhopal', 'laptop for WFH bhopal',
    'IT setup for new business bhopal', 'complete IT infrastructure bhopal',
    'turnkey IT solutions bhopal', 'IT audit services bhopal',
    'cyber security bhopal', 'IT consulting bhopal',
    'managed IT services bhopal', 'IT outsourcing bhopal',
];

// ---------------------------------------------------------------------------
// Per-Page Keyword Sets
// ---------------------------------------------------------------------------

export const pageKeywords = {
    home: [
        ...brandKeywords,
        'IT hardware sales bhopal', 'IT hardware rental bhopal',
        'best IT company bhopal', 'IT solutions bhopal',
        'laptop rental bhopal', 'server rental bhopal', 'CCTV installation bhopal',
        'website development bhopal', 'mobile app development bhopal',
        'SEO services bhopal', 'AEO services bhopal', 'GEO services bhopal',
        'custom software development bhopal', 'digital marketing bhopal',
        'IT products near me', 'computer hardware shop bhopal',
        'IT equipment supplier bhopal', 'IT infrastructure bhopal',
        'enterprise IT solutions bhopal', 'best IT hardware dealer bhopal',
    ].join(', '),

    products: [
        // Core products
        'IT hardware products bhopal', 'IT products bhopal', 'buy IT hardware bhopal',
        'IT hardware for sale bhopal', 'computer products bhopal',
        // Buy actions per product
        'laptop buy bhopal', 'desktop buy bhopal', 'server buy bhopal',
        'printer buy bhopal', 'CCTV camera buy bhopal', 'IP camera buy bhopal',
        'biometric device buy bhopal', 'GPS tracker buy bhopal',
        'LED monitor buy bhopal', 'networking equipment bhopal',
        // Rent actions per product
        'laptop on rent bhopal', 'laptop rental bhopal', 'laptop rent per month bhopal',
        'desktop on rent bhopal', 'server on rent bhopal', 'server rental bhopal',
        'printer on rent bhopal', 'projector on rent bhopal',
        'computer on rent for exam bhopal', 'bulk laptop rental bhopal',
        'workstation rental bhopal', 'IT equipment on rent bhopal',
        // Pricing keywords
        'laptop price bhopal', 'desktop price bhopal', 'server price bhopal',
        'CCTV camera price bhopal', 'biometric price bhopal',
        'laptop under 30000 bhopal', 'laptop under 50000 bhopal',
        'cheapest laptop bhopal', 'best laptop deals bhopal',
        // Brand-specific
        'HP laptop bhopal', 'Dell laptop bhopal', 'Lenovo laptop bhopal',
        'HP laptop dealer bhopal', 'Dell laptop dealer bhopal',
        'Lenovo laptop dealer bhopal', 'Asus laptop dealer bhopal',
        'Hikvision CCTV dealer bhopal', 'Dahua CCTV dealer bhopal',
        'CP Plus CCTV dealer bhopal', 'Cisco router dealer bhopal',
        'TP-Link dealer bhopal', 'D-Link switch dealer bhopal',
        'Canon printer dealer bhopal', 'HP printer dealer bhopal',
        'eSSL biometric dealer bhopal', 'ZKTeco dealer bhopal',
        // Specification-based
        'i5 laptop bhopal', 'i7 laptop bhopal', 'i3 laptop bhopal',
        '8GB RAM laptop bhopal', '16GB RAM laptop bhopal',
        '256GB SSD laptop bhopal', '512GB SSD laptop bhopal',
        '2MP CCTV camera bhopal', '4MP IP camera bhopal',
        '4K CCTV camera bhopal', 'PTZ camera bhopal',
        'dome camera bhopal', 'bullet camera bhopal',
        'night vision camera bhopal', 'wireless camera bhopal',
        '8 channel DVR bhopal', '16 channel NVR bhopal',
        'POE switch bhopal', '24 port switch bhopal',
        'gigabit switch bhopal', 'managed switch bhopal',
        // Condition
        'refurbished laptop bhopal', 'used laptop bhopal', 'second hand laptop bhopal',
        'refurbished desktop bhopal', 'refurbished server bhopal',
        'cheap laptop bhopal', 'affordable desktop bhopal',
        'genuine IT hardware bhopal', 'branded laptop bhopal',
        // Category pages
        'enterprise server bhopal', 'server rack bhopal',
        'workstation bhopal', 'UPS bhopal', 'APC UPS bhopal',
        'barcode scanner bhopal', 'POS system bhopal',
        'fingerprint scanner bhopal', 'face recognition device bhopal',
        'attendance machine bhopal', 'access control system bhopal',
        'vehicle GPS tracker bhopal', 'fleet management bhopal',
        // Near-me
        'IT hardware near me', 'laptop shop near me',
        'computer shop near me', 'IT store near me',
        'hardware shop near me', 'CCTV shop near me',
        'laptop rental near me', 'computer hardware dealer near me',
        // AEO questions
        'where to buy laptop in bhopal', 'where to rent laptop in bhopal',
        'best laptop shop in bhopal', 'CCTV camera installation cost bhopal',
        'how much does laptop rental cost in bhopal',
        ...brandKeywords.slice(0, 10),
    ].join(', '),

    services: [
        // Core IT services
        'IT services bhopal', 'IT hardware services bhopal',
        'IT hardware rental services bhopal', 'laptop rental service bhopal',
        'server rental service bhopal', 'IT equipment rental bhopal',
        // Hardware repair & AMC
        'IT hardware repair bhopal', 'laptop repair service bhopal',
        'computer repair service bhopal', 'printer repair service bhopal',
        'AMC services bhopal', 'annual maintenance contract bhopal',
        'IT support services bhopal', 'IT maintenance bhopal',
        'laptop screen repair bhopal', 'laptop motherboard repair bhopal',
        'laptop battery replacement bhopal', 'data recovery service bhopal',
        // Installation services
        'CCTV installation service bhopal', 'biometric installation service bhopal',
        'GPS installation service bhopal', 'network installation service bhopal',
        'WiFi installation bhopal', 'LAN cabling bhopal',
        'structured cabling bhopal', 'server room setup bhopal',
        'office IT setup bhopal', 'IT infrastructure setup bhopal',
        // Software development
        'website development service bhopal', 'web design service bhopal',
        'web development company bhopal', 'best web developer bhopal',
        'website design company bhopal', 'custom website bhopal',
        'React developer bhopal', 'Next.js developer bhopal',
        'Node.js developer bhopal', 'fullstack developer bhopal',
        'ecommerce website development bhopal', 'online store development bhopal',
        'landing page design bhopal', 'WordPress developer bhopal',
        'responsive web design bhopal', 'PWA development bhopal',
        // Mobile app development
        'mobile app development service bhopal', 'app development company bhopal',
        'Android app developer bhopal', 'iOS app developer bhopal',
        'React Native developer bhopal', 'Flutter developer bhopal',
        'cross platform app development bhopal', 'native app development bhopal',
        'app development cost bhopal', 'hire app developer bhopal',
        // Custom software
        'software development service bhopal', 'software company bhopal',
        'custom software development bhopal', 'bespoke software bhopal',
        'CRM development bhopal', 'CRM software bhopal',
        'ERP development bhopal', 'ERP software bhopal',
        'billing software bhopal', 'inventory software bhopal',
        'hospital management software bhopal', 'school management software bhopal',
        'hotel management software bhopal', 'real estate software bhopal',
        'lead management system bhopal', 'SaaS development bhopal',
        'API development bhopal', 'microservices development bhopal',
        // Digital marketing & SEO
        'SEO services bhopal', 'SEO company bhopal', 'SEO agency bhopal',
        'local SEO bhopal', 'best SEO services bhopal',
        'AEO services bhopal', 'answer engine optimization bhopal',
        'GEO services bhopal', 'generative engine optimization bhopal',
        'digital marketing services bhopal', 'digital marketing agency bhopal',
        'Google Ads management bhopal', 'social media marketing bhopal',
        'content marketing bhopal', 'video marketing bhopal',
        // Cloud & infrastructure
        'cloud solutions bhopal', 'AWS deployment bhopal',
        'cloud computing bhopal', 'IT outsourcing bhopal',
        'custom software bhopal', 'IT consulting bhopal',
        'managed IT services bhopal',
        'IT solutions provider bhopal', 'IT service center bhopal',
        'IT helpdesk bhopal', 'onsite IT support bhopal',
        // AEO natural language
        'best software company in bhopal', 'who develops websites in bhopal',
        'who develops mobile apps in bhopal', 'best app developer in bhopal',
        'how much does website development cost in bhopal',
        'top IT company bhopal', 'best digital marketing company bhopal',
        ...brandKeywords.slice(0, 10),
    ].join(', '),

    about: [
        'about yantraq', 'yantraq company', 'yantraq bhopal company',
        'yantraq pvt ltd about', 'yantraq history', 'yantraq team',
        'IT company bhopal', 'best IT company bhopal',
        'IT hardware company bhopal', 'technology company bhopal',
        'IT solutions company bhopal', 'trusted IT company bhopal',
        'yantraq mission', 'yantraq vision', 'yantraq values',
        'IT company in madhya pradesh', 'IT company near me',
        'top IT companies bhopal', 'leading IT company bhopal',
        'established IT company bhopal', 'yantraq reviews',
        'yantraq ratings', 'yantraq experience',
        'pushpako2 sister company', 'yantraq pvt ltd bhopal',
        ...brandKeywords.slice(0, 15),
    ].join(', '),

    contact: [
        'contact yantraq', 'yantraq contact number', 'yantraq phone number',
        'yantraq email', 'yantraq address', 'yantraq bhopal address',
        'yantraq office address', 'yantraq whatsapp',
        'IT hardware shop contact bhopal', 'laptop shop contact bhopal',
        'computer shop contact bhopal', 'CCTV company contact bhopal',
        'IT company contact bhopal', 'IT services contact bhopal',
        'yantraq location', 'yantraq directions', 'yantraq map',
        'yantraq bagsewaniya', 'IT shop bagsewaniya bhopal',
        'how to reach yantraq', 'yantraq opening hours',
        'yantraq business hours', 'yantraq customer care',
        'yantraq support number', 'yantraq helpline',
        'IT hardware enquiry bhopal', 'laptop rental enquiry bhopal',
        ...brandKeywords.slice(0, 10),
    ].join(', '),

    faq: [
        'yantraq FAQ', 'IT hardware FAQ bhopal', 'laptop rental FAQ bhopal',
        'CCTV installation FAQ bhopal', 'IT services FAQ bhopal',
        'laptop on rent questions', 'IT hardware questions bhopal',
        'yantraq queries', 'IT hardware common questions',
        'laptop rental how it works', 'CCTV installation process',
        'AMC contract details', 'IT support process bhopal',
        'yantraq help', 'yantraq customer queries',
        'what is yantraq', 'how yantraq works',
        'yantraq pricing', 'yantraq plans',
        ...brandKeywords.slice(0, 10),
    ].join(', '),

    productDetail: [
        'product details', 'product specifications', 'product features',
        'buy online bhopal', 'rent online bhopal', 'product price bhopal',
        'IT hardware specifications', 'product review yantraq',
        ...brandKeywords.slice(0, 10),
    ].join(', '),
};

// ---------------------------------------------------------------------------
// Dynamic Keyword Generator (from DB product data)
// ---------------------------------------------------------------------------
export function generateDynamicProductKeywords(product: {
    name: string;
    category: string;
    features?: string[];
    description?: string;
}): string {
    const keywords: string[] = [];
    const name = product.name;
    const category = product.category.replace(/-/g, ' ');

    // Name-based
    keywords.push(name, `${name} bhopal`, `${name} price`, `${name} price in bhopal`);
    keywords.push(`buy ${name}`, `buy ${name} bhopal`, `buy ${name} online`);
    keywords.push(`rent ${name}`, `rent ${name} bhopal`, `${name} on rent bhopal`);
    keywords.push(`${name} dealer bhopal`, `${name} supplier bhopal`);
    keywords.push(`${name} repair bhopal`, `${name} service bhopal`);
    keywords.push(`best ${name} bhopal`, `cheap ${name} bhopal`, `affordable ${name} bhopal`);

    // Category-based
    keywords.push(`${category} bhopal`, `best ${category} bhopal`);
    keywords.push(`${category} dealer bhopal`, `${category} shop bhopal`);
    keywords.push(`buy ${category} bhopal`, `rent ${category} bhopal`);

    // Feature-based
    if (product.features) {
        for (const feature of product.features.slice(0, 4)) {
            keywords.push(`${feature} ${category} bhopal`);
        }
    }

    return keywords.join(', ');
}

// ---------------------------------------------------------------------------
// Master keyword getter — returns ALL keywords as a single string
// ---------------------------------------------------------------------------
export function getAllKeywords(): string {
    const generated = generateProductKeywords();
    const all = [
        ...brandKeywords,
        ...generated,
        ...serviceKeywords,
        ...industryKeywords,
        ...aeoGeoKeywords,
        ...additionalKeywords,
    ];
    return [...new Set(all)].join(', ');
}

// Count utility for verification
export function getKeywordCount(): number {
    const generated = generateProductKeywords();
    const all = new Set([
        ...brandKeywords,
        ...generated,
        ...serviceKeywords,
        ...industryKeywords,
        ...aeoGeoKeywords,
        ...additionalKeywords,
    ]);
    return all.size;
}
