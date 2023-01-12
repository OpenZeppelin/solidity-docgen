# `solidity-docgen`

*solidity-docgen Solidity projeleri için dokumantasyon çıktısı alınmasını sağlayan bir yazılımdır.*

Çıktı, Handlebars şablonları aracılığı ile tamamen yapılandırılabilir, fakat varsayılan şablonlar kaynak kodundaki tüm bilgileri Markdown formatında göstermek için iyi bir iş çıkartmalıdır. Oluşturulan Markdown dosyaları, bir dokumantasyon sayfası yayınlanmak istendiği zaman Vuepress, MkDocs, Jekyll (GitHub Pages) gibi statik sayfa oluşturucuları ile beraber kullanılabilir

Bu, yeniden yazılan ve yeniden tasarlanan aracın daha yeni bir sürümüdür. Önceki sürümden geçişi kolaylaştırmak ve kullanım ve yapılandırmaya yardımcı olmak için biraz daha çalışma bekleniyor.

## Kullanım

npm aracılığı ile `solidity-docgen` kurulumunu sağlayın.

### Hardhat

Eklentiyi Hardhat ayarlarınıza ekleyin.

```diff
 // hardhat.config.ts
+import 'solidity-docgen';

 export default {
+  docgen: { ... }, // ayarlamaların değiştirilmesi gerekiyor ise
 };
```
Sonrasında `hardhat docgen` komutu ile çalıştırın.

### Kütüphane Olarak

```typescript
import { docgen } from 'solidity-docgen';

await docgen([{ output: solcOutput }], config);
```
`solcOutput`, en azından `ast` çıktısı ile beraber derleyicinin standart JSON çıktısı olmalı. Birden fazla olabilir.

`config` aşağıda belirtilen değerlere sahip isteğe bağlı bir nesnedir.

## Config

Seçenek listesi ve dokumantasyon için gözat: [`config.ts`](./src/config.ts)