import { Container, Filters, Title, TopBar } from "@/components/shared";
import { ProductCard } from "@/components/shared/product-card";
import { ProductGroupList } from "@/components/shared/product-group-list";

export default function Home() {
  return (
    <>
      <Container className="mt-10">
        <Title text="Все пиццы" size="lg" className="font-extrabold" />
      </Container>
      <TopBar />
      <Container className="mt-10 pb-14">
        <div className="flex gap-[80px]">
          {/* Фильтрация */}
          <div className="w-[250px]">
            <Filters />
          </div>

          {/* Список товаров */}
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              <ProductGroupList
                title="Пиццы"
                categoryId={1}
                items={[
                  {
                    id: 1,
                    name: "Кола-барбекю",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:584x584/11EF9050501F3FA690A64053F5F07626.avif",
                    items: [{ price: 550 }],
                  },
                  {
                    id: 1,
                    name: "Кола-барбекю",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:584x584/11EF9050501F3FA690A64053F5F07626.avif",
                    items: [{ price: 550 }],
                  },
                  {
                    id: 1,
                    name: "Кола-барбекю",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:584x584/11EF9050501F3FA690A64053F5F07626.avif",
                    items: [{ price: 550 }],
                  },
                  {
                    id: 1,
                    name: "Кола-барбекю",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:584x584/11EF9050501F3FA690A64053F5F07626.avif",
                    items: [{ price: 550 }],
                  },
                  {
                    id: 1,
                    name: "Кола-барбекю",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:584x584/11EF9050501F3FA690A64053F5F07626.avif",
                    items: [{ price: 550 }],
                  },
                  
                ]}
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
