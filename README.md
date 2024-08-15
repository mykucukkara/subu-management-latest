# Kalite Kontrol ve Form Yönetim Platformu

Bu proje, Sakarya Uygulamalı Bilimler Üniversitesi (SUBÜ) için geliştirilmiş bir kalite kontrol ve form yönetim platformudur. Platform, kalite kontrol süreçlerini dijitalleştirmek, form yönetimini kolaylaştırmak ve kullanıcı dostu bir arayüz sunmak amacıyla geliştirilmiştir. Proje, modern web teknolojilerini kullanarak geliştirilmiş olup, hem frontend hem de backend tarafı güçlü ve esnek bir mimariye sahiptir.

## İçindekiler

- [Özellikler](#özellikler)
- [Proje Yapısı](#proje-yapısı)
- [Kurulum](#kurulum)
- [Kullanım](#kullanım)
- [Docker Kullanımı](#docker-kullanımı)
- [Lisans](#lisans)

## Özellikler

- **Form Yönetimi:** Kullanıcılar, çeşitli formlar oluşturabilir, düzenleyebilir ve yönetebilir.
- **Kalite Kontrol:** Sistem, kalite kontrol süreçlerini izlemek ve yönetmek için kullanılır.
- **Kullanıcı Kimlik Doğrulama:** JWT (JSON Web Token) ve bcrypt teknolojileri kullanılarak güvenli kimlik doğrulama sağlar.
- **Responsive Tasarım:** Bootstrap ve SCSS kullanılarak mobil uyumlu bir arayüz sağlanmıştır.
- **Özelleştirilebilir Raporlama:** Kullanıcıların ihtiyaçlarına göre özel raporlar oluşturmasına olanak tanır.
- **Gerçek Zamanlı Bildirimler:** Kritik süreçler için anında bilgilendirme sağlar.
- **Veritabanı Yedekleme:** Verilerin düzenli olarak yedeklenmesini sağlar.

## Proje Yapısı

Proje, MVC (Model-View-Controller) mimarisi üzerine kuruludur ve aşağıdaki gibi organize edilmiştir:

- **Backend (Sunucu Tarafı):**
- `app/api/*` - İş mantığının yönetildiği denetleyici dosyaları.
- `models/*` - Veritabanı şemalarının ve işlevlerinin tanımlandığı modeller.
- `` - API rotalarının tanımlandığı dosyalar.
- `middlewares.ts` - Orta katman işlevlerinin yer aldığı dosyalar (kimlik doğrulama vb.).
- `utils/*` - Uygulama yapılandırma dosyaları (veritabanı bağlantıları,...).

- **Frontend (İstemci Tarafı):**
- `app/[pages]/*` - Next.js sayfa bileşenleri.
- `components/` - Tekrar kullanılabilir React bileşenleri.
- `styles/` - SCSS ve ModuleCSS dosyaları.
- `public/` - Statik dosyalar (görseller, favicon vb.).

## Kurulum

Projeyi yerel ortamınızda çalıştırmak için aşağıdaki adımları izleyin:

#### Not: Bu uygulamayı Docker harici çalıştırmak istiyorsanız makinenizde `Node.js` ve `MongoDB` kurulu olmalıdır.

#### [MongoDB'yi indir](https://www.mongodb.com/docs/manual/administration/install-community/) | [Node.js'yi indir](https://nodejs.org/en/download/prebuilt-installer)



1. **Depoyu Klonlayın:**
 ```bash
 git clone <repo-url>
 cd proje-dizini
 ```

2. **Gerekli Bağımlılıkları Yükleyin:**
 ```bash
 npm install
 ```
3. **Projeyi başlatın :**
 ```bash
 npm run dev
 ```
## Kullanım

Uygulamayı başlattıktan sonra, tarayıcınızda `http://localhost:3000` adresine giderek uygulamayı kullanmaya başlayabilirsiniz. Uygulama, kullanıcı dostu bir arayüz ve sezgisel navigasyon ile desteklenmiştir.

## REST API Kullanımı

Projenin içerisindeki `Subü Management.postman_collection.json` dosyasını [Postman](https://www.postman.com/downloads/) (api testing ürünü) üzerinden import ederek tüm API rotalarını ve örnek geliştiriler olarak doldurulmuş istek gövdelerini, path isimlerini, oturum tokenlerini inceleyebilir ve test edebilirsiniz. 
 

## Teknolojiler

Proje geliştirilirken aşağıdaki teknolojiler kullanılmıştır:

- **Frontend:**
- Next.js: Sayfa yönlendirmeleri ve SSR (Sunucu Taraflı Render) desteği.
- React: Bileşen tabanlı kullanıcı arayüzü.
- SCSS: Gelişmiş stil seçenekleri ve esneklik.
- ModuleCSS: İzole edilmiş stil modülleri.
- Bootstrap: Hızlı ve responsive tasarım.

- **Backend:**
- Node.js: Sunucu tarafı çalıştırma ortamı.
- Mongoose: MongoDB ile etkileşim için ORM kütüphanesi.
- JWT: Güvenli kullanıcı kimlik doğrulama için JSON Web Token.
- bcrypt: Şifreleme ve parola güvenliği.

- **Veritabanı:**
- MongoDB: NoSQL veritabanı.

- **Diğer:**
- Docker: Uygulamayı containerize etmek için.
- Docker Compose: Çoklu container yapılandırması.

 

## Docker Kullanımı

Uygulamanın Docker kullanarak başlatılması için aşağıdaki adımlar izlenebilir:

1. **Docker ve Docker Compose'u Kurun:**
 Docker kurulu değilse, [Docker'ın resmi sitesinden](https://docs.docker.com/get-docker/) kurulum talimatlarını takip edebilirsiniz.

2. **Docker Compose ile Başlatın:**
 ```bash
 docker-compose up --build
 ```

3. **Container Durumunu Kontrol Edin:**
 ```bash
 docker ps
 ```

4. **Container'ı Durdurmak için:**
 ```bash
 docker-compose down
 ```




# Dağıtım & Yayına Alma

Yayına alma aşamasını birkaç adımda tamamlanmaktadır;
- [A) Ubuntu veya Linux Dağıtımlı VPS'e Docker Kurulumu](#)
- [B) Deployment Key ile Özel GitHub Deposu Erişimi](#)
- [C) Projenin Son Değişikliklerini Almak İçin Git İşlemleri](#)
- [D) Projenin Sürekli Dağıtım & Sürekli Entegrasyonu](#)




## A) Ubuntu veya Linux Dağıtımlı VPS'e Docker Kurulumu

Projeyi dockerize etmek için gerekli adımlar;

## 1. Makineye Docker ve Docker Compose kurulumu

Aşağıdaki kodu uzak sunucunuzun terminale yapıştırarak ve enter'a basarak gerekli paket indirmelerini yapabilirsiniz.

```
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
```

Sonrasında gerekli paketleri yüklemek için aşağıdaki kodu çalıştırabilirsiniz;

```
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin docker-compose-v2
```

## 1. Docker Engine'nin Kurulumunun Başarılı Olduğunu Doğrulama

Aşağıdaki kodları çalıştırarak docker'ın başarılı bir şekilde kurulduğundan emin olabilirsiniz. 

Bu kodlar docker'ı başlatılmadıysa başlatır ve `hello-world` adında bir docker konteynerini çalıştırır, bu konteyner sadece kurulumun başarılı olup olmadığını anlamak için oluşturulmuş bir docker konteyneridir. 

```
sudo service docker start
sudo docker run hello-world
```

Bu işlemlerin sonunda, Linux sunucunuza Docker kurulumu başarılı bir şekilde gerçekleşmiştir.
































## B) Deployment Key ile Özel GitHub Deposu Erişimi

Bu rehber, Ubuntu sunucunuzda oluşturduğunuz `deployment key` ile özel bir GitHub deposuna nasıl erişebileceğinizi anlatır.

## 1. Deployment Key Oluşturma

Öncelikle, sunucunuzda bir SSH anahtarı oluşturmanız gerekiyor:

```
ssh-keygen -t ed25519 -C "your_email@example.com"
```

Oluşturulan anahtarı varsayılan konuma (`~/.ssh/id_ed25519`) kaydedin.

### SSH Anahtarını GitHub'a Ekleme

Oluşturduğunuz `id_ed25519.pub` dosyasının içeriğini GitHub'daki depoya `deployment key` olarak eklemeniz gerekiyor:

1. SSH anahtarınızı kopyalayın:

  ```
  cat ~/.ssh/id_ed25519.pub
  ```

2. GitHub'da özel depoya gidin:
   - Depo sayfasında, `Settings` (Ayarlar) sekmesine gidin.
   - Sol menüde `Deploy keys` seçeneğine tıklayın.
   - `Add deploy key` butonuna tıklayın ve açılan sayfada SSH anahtarınızı yapıştırın.
   - `Allow write access` kutusunu işaretlemeniz gerekiyorsa işaretleyin, ardından `Add key` butonuna tıklayın.

## 2. SSH İstemcisini Yapılandırma

Sunucunuzda `~/.ssh/config` dosyasını düzenleyerek SSH bağlantınızı yapılandırabilirsiniz.
```
nano ~/.ssh/config
```
Bu dosyaya aşağıdaki satırları ekleyin:

```
Host github.com
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519
```

## 3. SSH Ajanını Başlatma ve Anahtarı Eklemek

SSH anahtarınızın kullanıma hazır olduğundan emin olun. Eğer SSH ajanı çalışmıyorsa, aşağıdaki komutları kullanarak başlatabilir ve anahtarı ekleyebilirsiniz:

```
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

## 4. Git Komutlarını Kullanarak Depoya Erişme

Artık depoya SSH üzerinden erişim sağlayabilirsiniz. Özel repoyu sunucunuza klonlamak için şu komutu kullanın:

```
git clone git@github.com:github_username/github_reponame.git
```

Bu komut, GitHub’daki özel repoya `deployment key` kullanarak erişir ve sunucunuza klonlar.

## 5. SSH Bağlantısını Test Etme

SSH bağlantısının doğru çalıştığından emin olmak için şu komutu çalıştırarak GitHub ile bağlantıyı test edebilirsiniz:

```
ssh -T git@github.com
```

Eğer her şey doğru yapılandırıldıysa, GitHub kullanıcı adınızla ilgili bir mesaj alırsınız.

Bu adımların sonunda, Ubuntu sunucunuzda GitHub özel depolarınıza `deployment key` ile erişebilirsiniz.


## C) Projenin Son Değişikliklerini Almak İçin Git İşlemleri

Bu rehber, projenizdeki son değişiklikleri almak için temel Git komutlarını nasıl kullanacağınızı açıklar.

## 1. Projeyi Güncelleme

Projenizdeki son değişiklikleri almak için aşağıdaki adımları izleyin:

### 1.1. Uzak Depodan Son Değişiklikleri Çekme

Öncelikle, projenizin bulunduğu dizine gidin:

```bash
cd /projenizin/bulundugu/klasor
```

Ardından, uzak depodan son değişiklikleri almak için aşağıdaki komutu kullanın:

```bash
git pull origin master
```

- `origin`: Uzak depoya verilen addır (varsayılan olarak `master`).
- `master`: Depodaki ana dalı (branch) temsil eder. Eğer farklı bir dal kullanıyorsanız, bu ismi değiştirin.

### 1.2. Yerel Değişiklikleri Kontrol Etme

Herhangi bir yerel değişikliğiniz varsa, bu değişiklikleri kontrol edebilirsiniz:

```bash
git status
```

Bu komut, hangi dosyaların değiştirildiğini, hangilerinin sahnelenmeye hazır olduğunu ve hangilerinin commit edilmesi gerektiğini gösterir.

### 1.3. Yerel Değişiklikleri Sahneleme ve Commit Etme

Eğer yerel değişiklikleriniz varsa, bunları sahneleyip commit etmek için şu adımları izleyin:

Önce dosyaları sahneye ekleyin:

```bash
git add .
```

Sonra bu değişiklikleri commit edin:

```bash
git commit -m "Yaptığınız değişiklikleri açıklayan kısa bir mesaj"
```

### 1.4. Son Değişiklikleri Yeniden Çekme (Gerekirse)

Eğer yerel değişikliklerinizi commit ettiyseniz, uzak depodaki son değişiklikleri yeniden çekmeniz gerekebilir. Bunun için:

```bash
git pull origin master
```

### 1.5. Çakışmaları Çözme

Eğer bir çakışma meydana gelirse, Git size hangi dosyalarda çakışma olduğunu gösterecektir. Bu dosyaları manuel olarak düzenleyip çakışmaları çözdükten sonra şu komutları kullanın:

Çakışmaları çözdükten sonra dosyaları sahneleyin:

```bash
git add .
```

Ardından çakışmaları commit edin:

```bash
git commit -m "Çakışmalar çözüldü"
```

Son olarak, uzak depodaki değişiklikleri çekmeyi tekrar deneyin:

```bash
git pull origin master
```

## 2. Değişikliklerinizi Uzak Depoya Gönderme

Yaptığınız değişiklikleri uzak depoya göndermek için aşağıdaki komutu kullanın:

```bash
git push origin master
```

Bu komut, yerel depodaki commitlerinizi uzak depoya gönderir.


Bu adımları takip ederek, projenizdeki son değişiklikleri alabilir, yerel değişikliklerinizi commit edebilir ve uzak depoya gönderebilirsiniz.













## D) Projenin Sürekli Dağıtım & Sürekli Entegrasyonu

Projeyi dockerize etmek için gerekli adımlar;

## 1. Projenin Docker ile Başlatılması

Projenin olduğu konuma giriyoruz; ``cd /projenin_oldugu_klasor``



Aşağıdaki kodu çalıştırarak, projenin kendisini ve MongoDB'yi docker ile çalıştırıyoruz. 

#### NOT: İlk aşamada bu işlem biraz uzun sürebilir

```

   docker compose up --build


```

Bu işlemden sonra projemiz ``http://localhost:3000`` yani Linux sunucumuzda ``http://?.?.?.?:3000`` portunda çalışacak. 

Aynı zamanda  MongoDB, kendisine özel bir alan oluşturacak ve verileri burada saklayacak.  

 
## 2. Sürekli Entegrasyon & Sürekli Dağıtım

Tüm bu işlemlerden sonra proje kodlarında herhangi bir değişiklik veya yeni özellikler için yerel projenizdeki son değişilkileri commit edip bu github reposuna push ettikten sonra;

```
   git pull origin master 
```

``master`` varsayılan olarak bu projenin ana branch'i olduğundan dolayı bu kodu çalıştırarak bu branchteki son değişiklikleri linux sunucunuza çekebilirsiniz.


Sonrasında ise tekrardan aşağıdaki docker komutunu çalıştırarak tekrardan güncellediğiniz ve github'dan pull ettiğiniz kodları build ederek yeni versiyonu canlıya alabilirsiniz


```

   docker compose up --build


```
 
 Bu kod ile MongoDB tekrardan üzerine yazılır mı veya silinip baştan mı yüklenir diye düşünmemelisiniz.

 Yukarıda bahsettiğimiz gibi MongoDB, kendisine özel bir alan zaten ilk kurulumda oluşturmuş ve o alan üzerinden verileri saklama ve işleme özelliklerini gerçekleştirir. Buna docker'ın ``volume`` özelliği denir, durumları veya verileri konteynerler burada saklar her build işleminde tekrar tekrar silinmez veya üzerine yazılmaz.

 Kısacası veritabanı hakkında endişeye yer yoktur. 










 

## Lisans

Bu proje [MIT Lisansı](https://opensource.org/licenses/MIT) altında lisanslanmıştır.
