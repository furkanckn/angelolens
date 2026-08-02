import type { Locale } from "@/i18n/routing";

export type ArticleSection = {
  heading?: string;
  paragraphs: string[];
};

export type ArticleCopy = {
  title: string;
  description: string;
  sections: ArticleSection[];
};

export type Article = {
  slug: string;
  publishedAt: string;
  updatedAt?: string;
  /** Locales with dedicated copy; others fall back to `en`. */
  copy: Partial<Record<Locale, ArticleCopy>> & { en: ArticleCopy; tr: ArticleCopy };
};

export const ARTICLES: Article[] = [
  {
    slug: "coloured-lenses-for-brown-eyes",
    publishedAt: "2026-03-12",
    updatedAt: "2026-07-20",
    copy: {
      en: {
        title: "Coloured lenses for brown eyes: what actually shows",
        description:
          "A practical guide to picking coloured contact lenses when your natural iris is brown — without chasing a costume look.",
        sections: [
          {
            paragraphs: [
              "Brown eyes are common, which is exactly why shade choice gets tricky. A tint that looks vivid on a light iris can disappear on a darker one. The opposite also happens: a soft grey that looks quiet in the blister can read louder once it sits over deep brown.",
              "You do not need a dramatic ring to get a change. You need enough contrast for the colour to register in daylight — and enough softness that people notice your eyes, not the lens.",
            ],
          },
          {
            heading: "Start with daylight, not bathroom light",
            paragraphs: [
              "Shop photos and mirror selfies under warm bulbs lie. If you can, check a shade near a window. Brown irises pull warmth; champagne-gold packaging lights and yellow bathroom LEDs exaggerate green and hazel casts.",
              "Ask yourself a blunt question: do you want a shift people mention, or a shift that only you clock in photos? Both are valid. They just need different depths of pigment.",
            ],
          },
          {
            heading: "Greens and hazels usually travel well",
            paragraphs: [
              "On medium to dark brown eyes, olive and forest greens tend to read first. They create a cool edge against warm brown without needing a thick limbal ring. Honey and light hazel can work too, but they often need a slightly denser pattern or they wash out by afternoon.",
              "Bright emerald “party” greens are harder. They can look great for evenings and photos; for daytime they sometimes tip into costume territory unless the pattern is fine and the edge is soft.",
            ],
          },
          {
            heading: "Blues need a plan",
            paragraphs: [
              "Blue on brown is possible, but it is rarely subtle. If that is the point, lean into it and own a clearer sapphire or steel tone. If you want something quieter, look for blue-grey hybrids with a muted centre rather than a saturated sky blue.",
              "Grey is a useful middle path. On brown eyes it often cools the overall look instead of painting a brand-new iris. That cooler cast photographs cleanly and still feels like you.",
            ],
          },
          {
            heading: "Match the look to your features, not a filter",
            paragraphs: [
              "Hair colour, skin undertone, and even how much eyeliner you wear change the reading of a shade. Warm brown hair next to a cold grey can look sharp and modern. The same grey with very warm makeup may feel mismatched until you adjust either the lens or the palette.",
              "When you try Angelo Lens shades in person at an optician, bring the makeup you actually use. Five minutes with your usual routine tells you more than an hour of scrolling.",
            ],
          },
        ],
      },
      tr: {
        title: "Kahverengi gözler için renkli lens: ne gerçekten görünür?",
        description:
          "Doğal iris kahverengi olduğunda renkli kontakt lens seçmek için abartısız, uygulanabilir bir rehber.",
        sections: [
          {
            paragraphs: [
              "Kahverengi göz yaygın olduğu için ton seçimi zorlaşır. Açık iris üzerinde parlak duran bir renk, koyu kahvede kaybolabilir. Tersi de olur: blisterda sakin görünen yumuşak bir gri, koyu kahverenginin üstünde daha belirgin okunabilir.",
              "Değişim için kalın bir halkaya ihtiyacınız yok. Gün ışığında rengin fark edilmesi için yeterli kontrast; insanların lensi değil bakışı fark etmesi için de yeterince yumuşak bir geçiş gerekir.",
            ],
          },
          {
            heading: "Banyo ışığına değil, gün ışığına bakın",
            paragraphs: [
              "Ürün fotoğrafları ve sıcak ampullü ayna selfileri yanıltır. Mümkünse tonu pencere yanında kontrol edin. Kahverengi irisler sıcaklığı emer; sarımsı banyo LED’leri yeşil ve ela tonlarını abartır.",
              "Net bir soru sorun: insanların yorum yaptığı bir değişim mi istiyorsunuz, yoksa daha çok fotoğrafta sizin fark ettiğiniz bir kayma mı? İkisi de doğru tercih; sadece farklı pigment derinliği ister.",
            ],
          },
          {
            heading: "Yeşil ve ela genelde iyi taşınır",
            paragraphs: [
              "Orta ve koyu kahverengide zeytin ve orman yeşilleri çoğu zaman önce okunur. Kalın limbal halkaya gerek kalmadan sıcak kahveye serin bir kenar verir. Bal ve açık ela da işe yarayabilir; ama desen biraz daha yoğun değilse öğleden sonra soluklaşabilir.",
              "Parlak “parti” yeşilleri daha zor. Akşam ve fotoğraf için güzel durabilir; gündüzde desen ince ve kenar yumuşak değilse kostüm etkisine kayabilir.",
            ],
          },
          {
            heading: "Mavi için plan şart",
            paragraphs: [
              "Kahverengi üzerine mavi mümkün, ama nadiren çok doğal kalır. Amaç buysa daha net bir safir veya çelik tona gidin. Daha sakin bir sonuç istiyorsanız doygun gök mavisi yerine soluk merkezli mavi-gri karışımlara bakın.",
              "Gri iyi bir orta yol. Kahverengide çoğu zaman yeni bir iris boyamak yerine genel bakışı serinletir. Fotoğrafta temiz durur ve hâlâ size benzer.",
            ],
          },
          {
            heading: "Filtreye değil, yüzünüze uydurun",
            paragraphs: [
              "Saç rengi, ten alt tonu ve kullandığınız eyeliner bile tonun okunuşunu değiştirir. Sıcak kahverengi saçın yanında soğuk gri modern durabilir. Aynı gri, çok sıcak bir makyajla uyumsuz gelebilir; ya lensi ya paleti biraz kaydırmak gerekir.",
              "Angelo Lens tonlarını optikte denerken gerçekten kullandığınız makyajı yanınızda bulundurun. Alışkanlıklarınızla beş dakika, saatlerce kaydırmaktan daha çok şey söyler.",
            ],
          },
        ],
      },
    },
  },
  {
    slug: "soft-contact-lens-hygiene-habits",
    publishedAt: "2026-04-02",
    updatedAt: "2026-07-18",
    copy: {
      en: {
        title: "Soft lens hygiene that survives a busy week",
        description:
          "Simple contact lens habits that reduce irritation risk — without turning your bathroom into a clinic.",
        sections: [
          {
            paragraphs: [
              "Most lens problems do not start with a dramatic mistake. They start with small shortcuts: rinsing a case with tap water “just once”, topping up old solution, or sleeping in lenses after a late train. Soft coloured lenses follow the same hygiene rules as clear ones. Pigment does not make them tougher.",
              "The goal is not perfection. It is a routine you can still keep on a tired Thursday.",
            ],
          },
          {
            heading: "Wash, then dry your hands properly",
            paragraphs: [
              "Soap and a full rinse matter more than brand of soap. Fragrance-heavy washes can leave a film that transfers to the lens. After washing, dry with a clean lint-free towel. Wet fingers drop more dust onto the lens surface.",
            ],
          },
          {
            heading: "Solution is not optional filler",
            paragraphs: [
              "If your lenses are reusable, use a multipurpose or peroxide system your optician is happy with. Never top up. Empty the case, rinse it with fresh solution (not water), and refill. Water — tap or bottled — is not sterile for lens care.",
              "Replace the case often. A scratched, cloudy case is a quiet biofilm hotel. Many people change lenses on schedule and forget the case for a year.",
            ],
          },
          {
            heading: "Wear time is part of hygiene",
            paragraphs: [
              "Closing your eyes on the sofa in lenses still counts as closed-eye wear. Overnight wear reduces oxygen and raises infection risk, coloured or not. If you are exhausted, take them out before you lie down — even if that means doing it in a less glamorous bathroom than usual.",
              "If a lens feels dry, add rewetting drops approved for contact lenses. Rubbing your eye through the lid rarely helps and can fold the lens.",
            ],
          },
          {
            heading: "When to stop and call someone",
            paragraphs: [
              "Redness that worsens, light sensitivity, unusual discharge, or pain that is more than mild dryness means stop. Remove the lenses and get advice from an eye-care professional. Keep the lenses in a clean case if you are asked to bring them in — do not “test” them again the next morning to see if the feeling passed.",
            ],
          },
        ],
      },
      tr: {
        title: "Yoğun haftaya dayanan yumuşak lens hijyeni",
        description:
          "Banyonuzu kliniğe çevirmeden tahriş riskini azaltan basit kontakt lens alışkanlıkları.",
        sections: [
          {
            paragraphs: [
              "Çoğu lens sorunu büyük bir hatayla başlamaz. Küçük kısayollarla başlar: kabı “bir kereliğine” musluk suyuyla çalkalamak, eski solüsyonun üstüne eklemek, geç bir yolculuktan sonra lenslerle uyumak. Renkli yumuşak lensler, şeffaf lenslerle aynı hijyen kurallarına bağlıdır. Pigment onları daha dayanıklı yapmaz.",
              "Amaç kusursuzluk değil. Yorgun bir perşembe akşamı hâlâ tutulabilen bir düzen.",
            ],
          },
          {
            heading: "Elleri yıkayın, sonra iyice kurulayın",
            paragraphs: [
              "Sabun markasından çok iyice durulamak önemlidir. Kokulu yıkamalar lenste film bırakabilir. Yıkadıktan sonra temiz, tüy bırakmayan bir havluyla kurulayın. Islak parmaklar lens yüzeyine daha çok toz taşır.",
            ],
          },
          {
            heading: "Solüsyon doldurma malzemesi değildir",
            paragraphs: [
              "Lensleriniz tekrar kullanılabilirse, optisyeninizin uygun bulduğu çok amaçlı veya peroksit sistemi kullanın. Üstüne eklemeyin. Kabı boşaltın, taze solüsyonla çalkalayın (suyla değil), yeniden doldurun. Musluk veya pet şişe suyu lens bakımı için steril sayılmaz.",
              "Kabını sık değiştirin. Çizik, bulanık bir kap sessiz bir biyofilm otelidir. Birçok kişi lensi takvimine göre değiştirir, kabı bir yıl unutur.",
            ],
          },
          {
            heading: "Takma süresi de hijyenin parçası",
            paragraphs: [
              "Lenslerle kanepede gözünüzü kapatmak da kapalı göz kullanımıdır. Gece kullanımı oksijeni düşürür ve enfeksiyon riskini artırır; renkli olsa da olmasa da. Çok yorgunsanız yatmadan çıkarın — her zamanki banyonuz olmasa bile.",
              "Lens kuru geliyorsa kontakt lens için uygun nemlendirici damla kullanın. Göz kapağı üzerinden ovuşturmak nadiren işe yarar; lensi katlayabilir.",
            ],
          },
          {
            heading: "Ne zaman durup yardım alın",
            paragraphs: [
              "Artan kızarıklık, ışıktan rahatsız olma, olağandışı akıntı veya hafif kuruluğu aşan ağrı varsa durun. Lensleri çıkarın ve göz sağlığı uzmanına danışın. Getirmeniz istenirse temiz bir kapta saklayın — ertesi sabah “geçti mi” diye yeniden denemeyin.",
            ],
          },
        ],
      },
    },
  },
  {
    slug: "first-days-with-coloured-contacts",
    publishedAt: "2026-04-28",
    updatedAt: "2026-07-22",
    copy: {
      en: {
        title: "Your first days with coloured contacts",
        description:
          "What to expect in the first week of coloured soft lenses — comfort, makeup, and the awkward insertion phase.",
        sections: [
          {
            paragraphs: [
              "The first coloured lens week is half technique, half patience. Even people who already wear clear lenses can feel a short adaptation when the pattern or thickness differs. That does not mean something is wrong. It means your lids are noticing a new edge.",
              "Give yourself unhurried mornings for a few days. Rushing is how lenses end up inside out or on the bathroom floor.",
            ],
          },
          {
            heading: "Check orientation before you commit",
            paragraphs: [
              "Place the lens on your fingertip like a bowl. If the edge flares out like a saucer, it is inside out. Some coloured lenses make this harder to see because of the print; take an extra second under good light.",
              "If insertion stings sharply and keeps stinging, remove the lens, rinse with the right solution, and try again. Persistent pain is not “getting used to it”.",
            ],
          },
          {
            heading: "Makeup order that saves time",
            paragraphs: [
              "Lenses in first, then makeup. Remover and oils last, after the lenses are out. Glitter and powder near the lash line migrate; a little goes further than you think once it hits a soft lens surface.",
              "Waterproof mascara is stubborn on removal days. If you can skip it for week one, your eyes will thank you.",
            ],
          },
          {
            heading: "Screens and dryness",
            paragraphs: [
              "Coloured lenses do not cause screen fatigue by themselves, but any new lens can make you blink less while you concentrate. Set a crude reminder to look away every so often. A bottle of lens-safe drops in your bag beats rubbing your eyes on the commute.",
            ],
          },
          {
            heading: "Keep the receipt and the advice",
            paragraphs: [
              "Buy from authorized sellers and keep the guidance that came with the fit. Replacement schedule, solution brand, and aftercare are part of the product — not optional fine print. If something feels off in week one, it is easier to correct early with your optician than after a month of guessing.",
            ],
          },
        ],
      },
      tr: {
        title: "Renkli kontakt lensle ilk günler",
        description:
          "Renkli yumuşak lenslerin ilk haftasında konfor, makyaj ve takma alışkanlığı için net beklentiler.",
        sections: [
          {
            paragraphs: [
              "İlk renkli lens haftası yarı teknik, yarı sabır işidir. Şeffaf lens kullananlar bile desen veya kalınlık farklıysa kısa bir uyum hissedebilir. Bu her zaman bir sorun olduğu anlamına gelmez; kapaklarınız yeni bir kenarı fark ediyor olabilir.",
              "Birkaç gün acele etmeden sabah ayırın. Acele, lensin ters dönmesine veya lavaboya düşmesine yol açar.",
            ],
          },
          {
            heading: "Takmadan önce yönü kontrol edin",
            paragraphs: [
              "Lensi parmak ucunda kase gibi tutun. Kenar tabak gibi dışa açılıyorsa tersidir. Bazı renkli lenslerde baskı yüzünden bunu görmek zorlaşır; iyi ışıkta bir saniye daha bakın.",
              "Takınca keskin yanma sürüyorsa çıkarın, uygun solüsyonla durulayın, yeniden deneyin. Sürekli ağrı “alışmak” değildir.",
            ],
          },
          {
            heading: "Zaman kazandıran makyaj sırası",
            paragraphs: [
              "Önce lens, sonra makyaj. Temizleyici ve yağlar en sonda, lensler çıktıktan sonra. Kirpik dibine yakın glitter ve pudra yer değiştirir; yumuşak lens yüzeyine değince sandığınızdan fazla görünür.",
              "Suya dayanıklı maskara çıkarma günlerinde inatçıdır. İlk hafta vazgeçebilirseniz gözleriniz rahat eder.",
            ],
          },
          {
            heading: "Ekran ve kuruluk",
            paragraphs: [
              "Renkli lens tek başına ekran yorgunluğu yaratmaz; ama yeni lensle yoğunlaşırken daha az kırpabilirsiniz. Ara sıra uzağa bakmak için kaba bir hatırlatıcı koyun. Çantanızdaki lens uyumlu damla, yolda göz ovuşturmaktan iyidir.",
            ],
          },
          {
            heading: "Fişi ve tavsiyeyi saklayın",
            paragraphs: [
              "Yetkili satıcılardan alın ve uygulama sırasında verilen rehberi saklayın. Değişim süresi, solüsyon ve bakım ürünün parçasıdır — isteğe bağlı dipnot değil. İlk haftada bir şey ters gelirse, bir ay tahmin etmekten önce optisyenle düzeltmek daha kolaydır.",
            ],
          },
        ],
      },
    },
  },
  {
    slug: "how-lens-parameters-affect-comfort",
    publishedAt: "2026-05-16",
    updatedAt: "2026-07-25",
    copy: {
      en: {
        title: "How lens parameters affect comfort",
        description:
          "Base curve, diameter, and material in plain language — why two soft lenses can feel completely different.",
        sections: [
          {
            paragraphs: [
              "People often shop coloured lenses by shade alone. Comfort, though, lives in the numbers printed on the box: base curve, diameter, power, and material family. Two lenses can share a similar green and feel nothing alike on the same eye.",
              "You do not need to become an engineer. You do need to respect a fit that was measured for you.",
            ],
          },
          {
            heading: "Base curve and diameter",
            paragraphs: [
              "Base curve describes how steep or flat the bowl of the lens is. Diameter is the overall width. Together they influence how the lens centres and how the edge sits under your lids. A lens that moves too much can blur with each blink; one that barely moves can feel tight by evening.",
              "Borrowing a friend’s parameters because you liked their colour is a common shortcut with a poor success rate.",
            ],
          },
          {
            heading: "Material and water content",
            paragraphs: [
              "Higher water is not automatically “more comfortable”. Some high-water lenses dehydrate faster in air-conditioned rooms and leave you chasing drops. Silicone hydrogel materials often handle oxygen differently from older hydrogels. What matters is how your eyes respond over a full day, not the marketing line on the carton.",
            ],
          },
          {
            heading: "Power still matters for coloured lenses",
            paragraphs: [
              "Plano coloured lenses exist for people who only want a colour change. If you need vision correction, get that power right. Squinting all afternoon will feel like a lens problem when it is really a prescription problem.",
            ],
          },
          {
            heading: "Refit when life changes",
            paragraphs: [
              "Hormones, medications, screen load, and age can change tear film. If a pair that used to feel fine starts burning at 4 p.m., do not silently tough it out for months. A quick check can save you from blaming the colour when the fit or schedule needs a tweak.",
            ],
          },
        ],
      },
      tr: {
        title: "Lens parametreleri konforu nasıl etkiler?",
        description:
          "Baz eğri, çap ve malzeme sade dille: aynı yeşil iki lens neden çok farklı hissedilir?",
        sections: [
          {
            paragraphs: [
              "İnsanlar renkli lensi çoğu zaman sadece tona göre seçer. Konfor ise kutudaki sayılarda yaşar: baz eğri, çap, derecesi, malzeme ailesi. İki lens benzer yeşili paylaşabilir ve aynı gözde hiç benzemeyen bir his bırakabilir.",
              "Mühendis olmanıza gerek yok. Sizin için ölçülmüş bir uygulamaya saygı göstermeniz gerekir.",
            ],
          },
          {
            heading: "Baz eğri ve çap",
            paragraphs: [
              "Baz eğri lensin kasesinin ne kadar dik veya düz olduğunu anlatır. Çap genel genişliktir. Birlikte lensin merkezlenmesini ve kenarın kapak altında nasıl durduğunu etkiler. Çok hareket eden lens her kırpmada bulanıklaştırabilir; hiç hareket etmeyen akşama doğru baskı yapabilir.",
              "Rengini beğendiğiniz için bir arkadaşınızın parametrelerini almak sık görülen, başarı oranı düşük bir kısayoldur.",
            ],
          },
          {
            heading: "Malzeme ve su oranı",
            paragraphs: [
              "Daha yüksek su otomatik olarak “daha konforlu” demek değildir. Bazı yüksek su oranlı lensler klimalı odada daha çabuk kurur ve sizi damla peşinde bırakır. Silikon hidrojel malzemeler oksijeni eski hidrojellerden farklı yönetebilir. Önemli olan kutudaki slogan değil, sizin gözünüzün tam gün boyu verdiği yanıttır.",
            ],
          },
          {
            heading: "Renkli lenste derece hâlâ önemli",
            paragraphs: [
              "Sadece renk isteyenler için platosuz (plano) renkli lensler vardır. Görüş düzeltmesi gerekiyorsa dereceyi doğru alın. Öğleden sonra sürekli kısarak bakmak lens sorunu gibi gelir; oysa reçete sorunudur.",
            ],
          },
          {
            heading: "Hayat değişince yeniden bakılın",
            paragraphs: [
              "Hormonlar, ilaçlar, ekran yükü ve yaş gözyaşı filmini değiştirebilir. Eskiden rahat olan bir çift saat 16:00’da yanmaya başlıyorsa aylarca sessizce dayananmayın. Kısa bir kontrol, rengi suçlamadan önce uygulama veya kullanım süresini düzeltmenizi sağlayabilir.",
            ],
          },
        ],
      },
    },
  },
  {
    slug: "natural-looking-coloured-lenses",
    publishedAt: "2026-06-08",
    updatedAt: "2026-07-28",
    copy: {
      en: {
        title: "Natural-looking coloured lenses without the costume effect",
        description:
          "How to keep a coloured contact lens believable in daylight — pattern, edge, and the rest of your face.",
        sections: [
          {
            paragraphs: [
              "“Natural” does not mean invisible. It means the colour could plausibly belong to you. That usually comes from a soft edge, a pattern that breaks up like a real iris, and a shade that respects your baseline rather than fighting it.",
              "Costume effect shows up when the limbal ring is too ink-black, the pupil zone is too empty, or the hue is a neon that never appears in human irises under office light.",
            ],
          },
          {
            heading: "Prefer complexity over flat colour",
            paragraphs: [
              "Real irises are messy in a beautiful way: spokes, freckles, a shift from centre to rim. Printed lenses that mimic a bit of that complexity photograph more kindly than a single flat wash of pigment.",
              "If a shade looks like a solid sticker in macro photos, it will likely look like a sticker in person too.",
            ],
          },
          {
            heading: "Mind the edge",
            paragraphs: [
              "A harsh dark ring can frame the eye for stage makeup and editorial shoots. For weekday wear, a softer transition usually ages better and reads less “applied”. Look at the lens on an eye, not only in the tray.",
            ],
          },
          {
            heading: "Let the rest of the face stay calm",
            paragraphs: [
              "When you change iris colour, busy glitter lids compete for attention. Many people find that cleaner skin, brushed brows, and a defined lash line do more for a believable result than extra colour on the lid.",
              "Jewellery and clothing undertones matter too. A cool grey lens next to heavy warm gold makeup can feel intentional and chic — or accidental. Decide which one you are doing.",
            ],
          },
          {
            heading: "Italian restraint as a practical filter",
            paragraphs: [
              "Angelo Lens was shaped around presence rather than spectacle. Use that as a shopping filter: if a look needs three disclaimers before you leave the house, it may be a special-occasion shade, not your everyday one. Keep those for nights when you want the room to notice. Keep the quieter tones for the days when you simply want your own gaze sharpened.",
            ],
          },
        ],
      },
      tr: {
        title: "Kostüm etkisine düşmeden doğal duran renkli lens",
        description:
          "Gün ışığında inandırıcı bir renkli kontakt lens için desen, kenar ve yüzün geri kalanı.",
        sections: [
          {
            paragraphs: [
              "“Doğal” görünmez demek değildir. Rengin size ait olabileceğini hissettirmek demektir. Bu genelde yumuşak kenardan, gerçek irisi andıracak kadar kırılmış bir desenden ve kendi temel bakışınızla kavga etmeyen bir tondan gelir.",
              "Kostüm etkisi, limbal halkanın fazla mürekkep siyahı olduğu, pupil bölgesinin fazla boş kaldığı veya ofis ışığında insan irisinde hiç görülmeyen bir neon seçildiğinde ortaya çıkar.",
            ],
          },
          {
            heading: "Düz renk yerine karmaşıklık",
            paragraphs: [
              "Gerçek irisler güzel bir dağınıklık taşır: ışınlar, benekler, merkezden kenara geçiş. Bunu biraz taklit eden baskılı lensler, tek düz bir pigment yıkamasından daha iyi fotoğraflanır.",
              "Bir ton makro fotoğrafta düz bir çıkartma gibi duruyorsa, yüzde de büyük ihtimalle çıkartma gibi durur.",
            ],
          },
          {
            heading: "Kenara dikkat",
            paragraphs: [
              "Sert koyu halka sahne makyajı ve editoryal çekimler için bakışı çerçeveleyebilir. Hafta içi kullanımda daha yumuşak geçiş genelde daha iyi yaşlanır ve daha az “yapıştırılmış” okunur. Lensi yalnızca kapta değil, gözde de görün.",
            ],
          },
          {
            heading: "Yüzün geri kalanını sakin tutun",
            paragraphs: [
              "Iris rengini değiştirirken kalabalık glitter kapaklar dikkat için yarışır. Birçok kişi temiz bir cilt, taranmış kaş ve belirgin kirpik çizgisinin, kapağa ekstra renk eklemekten daha inandırıcı sonuç verdiğini görür.",
              "Takı ve kıyafet alt tonu da işe karışır. Soğuk gri lens, ağır sıcak altın makyajın yanında bilinçli ve şık durabilir — ya da rastgele. Hangisini yaptığınıza siz karar verin.",
            ],
          },
          {
            heading: "İtalyan ölçüsü pratik bir filtre olsun",
            paragraphs: [
              "Angelo Lens, gösterişten çok varlık hissi üzerine kuruldu. Bunu alışveriş filtresi gibi kullanın: evden çıkmadan önce üç kez açıklama gerektiren bir görünüm, günlük tonunuz değil özel gün tonunuz olabilir. Odaya fark ettirmek istediğiniz gecelere saklayın. Bakışınızı sadece netleştirmek istediğiniz günlere daha sakin tonları bırakın.",
            ],
          },
        ],
      },
    },
  },
];

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function getArticleCopy(article: Article, locale: string): ArticleCopy {
  const key = locale as Locale;
  return article.copy[key] ?? article.copy.en;
}

export const ARTICLE_SLUGS = ARTICLES.map((a) => a.slug);
