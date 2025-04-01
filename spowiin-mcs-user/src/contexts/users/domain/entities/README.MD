# 🧩 Estructura del Dominio - Usuario
### 📄 User.entity.ts
 1. Define la entidad principal del usuario en el dominio

 2. Contiene todos los atributos del modelo de usuario, tanto requeridos como opcionales.

 3. Implementa la lógica de eventos de dominio mediante los métodos addDomainEvent y pullDomainEvents, permitiendo emitir eventos ante acciones que modifican el estado del usuario.

 4. Utiliza Value Objects (Email, Password, FirstName, LastName, etc.) para garantizar la validación, inmutabilidad y encapsulamiento de valores críticos del dominio.

 5. Emplea getters con prefijo _ para exponer valores primitivos desde los Value Objects sin romper su encapsulamiento. Por ejemplo: user._email retorna el valor primitivo de Email.

 6. Cumple con los principios DDD (Domain-Driven Design), encapsulando estado y lógica relacionada.

#### 🔐 Consideración: los atributos como domainEvents pueden mantenerse encapsulados si se desea ocultar la lógica interna fuera del agregado.

### ⚙️ User.actions.ts
 1. Contiene toda la lógica de comportamiento del usuario (acciones que puede realizar)

 2. Aquí se agrupan todas las acciones y comportamientos del usuario, como: actualizar datos, verificar cuenta, bloquear/desbloquear, eliminar/restaurar, etc.

 3. Cada acción está separada en un método estático siguiendo el principio Single Responsibility del patrón SOLID.

 4. Se encargan de emitir los eventos de dominio relevantes (UserUpdatedEvent, UserDeletedEvent, etc.) según la acción realizada, lo cual habilita comunicación entre servicios o procesos asíncronos.

 5. Las acciones validan reglas del negocio directamente relacionadas al usuario, como:

 6. Que no se pueda eliminar dos veces.

 7. Que la cuenta esté activa o no bloqueada antes de continuar.

 8. Que la contraseña coincida con la de confirmación.

 9. Se asegura el uso correcto de fechas, estados, flags booleanos, y otras propiedades del modelo.

### 🏭 User.factory.ts
 1. Punto central para la creación y transformación de objetos relacionados al usuario

 2. Centraliza la creación de nuevas instancias de usuario a través de métodos create, fromDTO, fromPrimitives, etc.

 3. Permite construir el objeto User con todas sus dependencias correctamente inyectadas (Value Objects, fechas por defecto, roles, etc.).

 4. Separa la lógica de creación de la lógica de comportamiento, siguiendo el patrón Factory.

 5. Facilita la conversión entre:

 6. DTOs ↔ Entidad del dominio

 7. Objetos planos ↔ Instancias completas del dominio

 8. Reduce duplicación de lógica al momento de instanciar usuarios en distintas capas (casos de uso, controladores, tests).

#### 🎯 Consideración: No incluir aquí acciones ni lógica de negocio. Esta clase es solo para construir o transformar datos al dominio.

### ✅ Recomendaciones generales
 1. Mantener la separación clara entre entidad (estado), acciones (comportamiento) y fábrica (creación) ayuda a escalar y mantener el proyecto fácilmente.

 2. Asegúrate que cada evento de dominio esté descrito, probado y manejado correctamente en su correspondiente manejador/event handler.

 3. Usa UserActions dentro de casos de uso (application layer), no directamente en controladores.

 4. Nunca crees un User directamente usando new User(...) fuera de la fábrica.