## Описание:

1. Вынес инпуты по разным компонентам (заменил классовые компоненты на функциональные), теперь в universalInput switch конструкция, которая рендерит нужный инпут, компонент оставил универсальным.
2. Убрал много лишнего кода, некоторые методы в хендлерах вызывались по несколько раз, хендлеры были запутаны, вызывая друг друга.
3. Убрал onKeyDown везде, кроме textfield (метод реализовывал табуляцию в поле, подумал, что кроме мультилайн полей она нигде не нужна), onBlur вынес в universalInput и реализовал сохранение в localStorage.
4. Дебаунс на onChange не работал вовсе, я реализовал хук useDebounce, пока в проекте нет нужды в нем, но на будущее, если будет какой то запрос на бэк, который пользуется значением из инпута, то можно в любом месте подписаться на стейт компонента и использовать debouncedValue (оставил для примера в копмоненте InputDefault (Input.jsx))
5. В тестовомм проекте использован достаточно ограниченный функционал компонента universalInput, и может быть я не до конца понял некоторые задумки (например actions, мне показалось, что он немножко нарушает принцип single responsibility), но я постарался сохранить всю изначальную логику :)
6. Из концептуальных идей я бы предложил a) заменить либу для маски (react-input-mask устарела, у нее есть deprecated метод findDOMNode, я бы предложил react-input/mask) и б) использовать storybook для таких сложных UI-компонентов
