Zamn new design V5
- فرز الالعاب: حروف والوف (2) / تحدي الصور (3) / العاب أخرى (4)
- إصلاح عرض الكمبيوتر ليبقى 2/3/4 فوق 900px
- إصلاح خروج عناصر البطاقة بواسطة grid داخلي و overflow
- على التابلت عمودان، وعلى الجوال عمود واحد

ADMIN ANALYTICS (2026-08):
- /admin/ shows privacy-respecting session timelines and click events, not screen video.
- It requires Firebase Authentication Email/Password and Realtime Database rules that restrict analytics reads to admins.
- Public tracking never records input field values, phone numbers, activation codes, passwords, or typed text.
- Legacy photo ownership migration automatically grants code 116677 to owners of old unique codes 1850 or 17007.
- Historical code 1950 is NOT auto-migrated because it overlaps with the current Horof game code and cannot be distinguished safely.
