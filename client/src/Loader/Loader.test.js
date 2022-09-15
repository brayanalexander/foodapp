import React from "react";
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { prettyDOM } from "@testing-library/dom";
import Loader from "./Loader";

describe('Loader',()=>{
    it('renderizar Loader',()=>{
        const component=render(<Loader/>)
    })

    it('Debe tener un elemento IMG',()=>{
        const component=render(<Loader/>)
        const img=component.container.querySelector('img')
        expect(img).toBeTruthy()
    })

    it('Debe tener una elemento P',()=>{
        const component=render(<Loader/>)
        const p=component.container.querySelector('p')
        expect(p).toBeTruthy()
    })

    it('Debe tener un texto que diga Cargando...',()=>{
        const component=render(<Loader/>)
        expect(component.container).toHaveTextContent("Cargando...")
    })
    
    //component.getByText('Cargando...')
    //expect(component.container).toHaveTextContent("camion")
    //const p=component.container.querySelector('p')
    //console.log(prettyDOM(p))
})