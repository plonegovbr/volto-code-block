"use strict";(self.webpackChunk_plone_volto=self.webpackChunk_plone_volto||[]).push([[7300],{"../../../packages/volto-code-block/src/components/Blocks/Mermaid/DefaultView.stories.jsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{ClassDiagram:function(){return ClassDiagram},FlowChart:function(){return FlowChart},PieChart:function(){return PieChart},SequenceDiagram:function(){return SequenceDiagram},__namedExportsOrder:function(){return __namedExportsOrder}});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("../../../node_modules/.pnpm/react@18.2.0/node_modules/react/index.js"),_DefaultView__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("../../../packages/volto-code-block/src/components/Blocks/Mermaid/DefaultView.jsx"),_plone_volto_storybook__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/storybook.jsx"),__jsx=react__WEBPACK_IMPORTED_MODULE_0__.createElement;__webpack_exports__.default={title:"Public/Blocks/MermaidBlock",component:_DefaultView__WEBPACK_IMPORTED_MODULE_1__.c,decorators:[(Story,{args:args})=>__jsx(_plone_volto_storybook__WEBPACK_IMPORTED_MODULE_2__.cp,{anonymous:!0},__jsx("div",{style:{width:"1000px"}},__jsx(Story,args)))],argTypes:{code:{name:"Code",description:"Code to be displayed",control:"text"},block:{name:"Block ID",description:"Id of the block being used"}},args:{code:"",block:"12345"}};const SequenceDiagram={args:{code:"sequenceDiagram\n    Alice->>John: Hello John, how are you?\nJohn--\x3e>Alice: Great!\nAlice-)John: See you later!",block:"sequence-123"}},FlowChart={args:{code:"flowchart LR\n  subgraph TOP\n    direction TB\n    subgraph B1\n        direction RL\n        i1 --\x3ef1\n    end\n    subgraph B2\n        direction BT\n        i2 --\x3ef2\n    end\n  end\n  A --\x3e TOP --\x3e B\n  B1 --\x3e B2\n",block:"flowchar-123"}},ClassDiagram={args:{code:'classDiagram\n    note "From Duck till Zebra"\n    Animal <|-- Duck\n    note for Duck "can fly\ncan swim\ncan dive\ncan help in debugging"\n    Animal <|-- Fish\n    Animal <|-- Zebra\n    Animal : +int age\n    Animal : +String gender\n    Animal: +isMammal()\n    Animal: +mate()\n    class Duck{\n        +String beakColor\n        +swim()\n        +quack()\n    }\n    class Fish{\n        -int sizeInFeet\n        -canEat()\n    }\n    class Zebra{\n        +bool is_wild\n        +run()\n    }',block:"classdiagram-123"}},PieChart={args:{code:'pie title Pets adopted by volunteers\n    "Dogs" : 386\n    "Cats" : 85\n    "Rats" : 15\n',block:"piechart-123"}};SequenceDiagram.parameters={...SequenceDiagram.parameters,docs:{...SequenceDiagram.parameters?.docs,source:{originalSource:"{\n  args: {\n    code: codeSequence,\n    block: 'sequence-123'\n  }\n}",...SequenceDiagram.parameters?.docs?.source}}},FlowChart.parameters={...FlowChart.parameters,docs:{...FlowChart.parameters?.docs,source:{originalSource:"{\n  args: {\n    code: codeFlowChart,\n    block: 'flowchar-123'\n  }\n}",...FlowChart.parameters?.docs?.source}}},ClassDiagram.parameters={...ClassDiagram.parameters,docs:{...ClassDiagram.parameters?.docs,source:{originalSource:"{\n  args: {\n    code: codeClassDiagram,\n    block: 'classdiagram-123'\n  }\n}",...ClassDiagram.parameters?.docs?.source}}},PieChart.parameters={...PieChart.parameters,docs:{...PieChart.parameters?.docs,source:{originalSource:"{\n  args: {\n    code: codePieChart,\n    block: 'piechart-123'\n  }\n}",...PieChart.parameters?.docs?.source}}};const __namedExportsOrder=["SequenceDiagram","FlowChart","ClassDiagram","PieChart"]}}]);