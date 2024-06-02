import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TodoApi } from '../../api';


class Edge 
{ 
    constructor(flow, capacity, u, v) 
    { 
        this.flow = flow; 
        this.capacity = capacity; 
        this.u = u; 
        this.v = v; 
    } 
} 

// Represent a Vertex 
class Vertex 
{ 

    constructor(h, e_flow) 
    { 
        this.h = h; 
        this.e_flow = e_flow; 
    } 
}

// To represent a flow network 
class Graph 
{ 
    
    // int V;    // No. of vertices 
    // vector<Vertex> ver; 
    // vector<Edge> edge; 
    constructor(V) 
    { 
        this.V = V; 
        this.edge = new Array();
        this.ver = new Array();
        // all vertices are initialized with 0 height 
        // and 0 excess flow 
        for (let i = 0; i < V; i++) 
            this.ver.push(new Vertex(0, 0)); 
    }
    
    addEdge(u, v, capacity) 
    { 
        // flow is initialized with 0 for all edge 
        this.edge.push(new Edge(0, capacity, u, v)); 
    } 


    preflow(s) 
    { 
        // Making h of source Vertex equal to no. of vertices 
        // Height of other vertices is 0. 
        this.ver[s].h = this.ver.length; 

        // 
        for (let i = 0; i < this.edge.length; i++) 
        { 
            // If current edge goes from source 
            if (this.edge[i].u == s) 
            { 
                // Flow is equal to capacity 
                this.edge[i].flow = this.edge[i].capacity; 

                // Initialize excess flow for adjacent v 
                this.ver[this.edge[i].v].e_flow += this.edge[i].flow; 

                // Add an edge from v to s in residual graph with 
                // capacity equal to 0 
                this.edge.push(new Edge(-this.edge[i].flow, 0, this.edge[i].v, s)); 
            } 
        } 
    } 
    
    // returns index of overflowing Vertex 
    overFlowVertex() 
    { 
        for (let i = 1; i < this.ver.length - 1; i++) 
        if (this.ver[i].e_flow > 0) 
                return i; 

        // -1 if no overflowing Vertex 
        return -1; 
    } 
    

    // Update reverse flow for flow added on ith Edge 
    updateReverseEdgeFlow(i, flow) 
    { 
        let u = this.edge[i].v;
        let v = this.edge[i].u; 

        for (let j = 0; j < this.edge.length; j++) 
        { 
            if (this.edge[j].v == v && this.edge[j].u == u) 
            { 
                this.edge[j].flow -= flow; 
                return; 
            } 
        } 

        // adding reverse Edge in residual graph 
        let e = new Edge(0, flow, u, v); 
        this.edge.push(e); 
    } 

    // To push flow from overflowing vertex u 
    push(u) 
    { 
        // Traverse through all edges to find an adjacent (of u) 
        // to which flow can be pushed 
        for (let i = 0; i < this.edge.length; i++) 
        { 
            // Checks u of current edge is same as given 
            // overflowing vertex 
            if (this.edge[i].u == u) 
            { 
                // if flow is equal to capacity then no push 
                // is possible 
                if (this.edge[i].flow == this.edge[i].capacity) 
                    continue; 

                // Push is only possible if height of adjacent 
                // is smaller than height of overflowing vertex 
                if (this.ver[u].h > this.ver[this.edge[i].v].h) 
                { 
                    // Flow to be pushed is equal to minimum of 
                    // remaining flow on edge and excess flow. 
                    let flow = Math.min(this.edge[i].capacity - this.edge[i].flow, 
                                this.ver[u].e_flow); 

                    // Reduce excess flow for overflowing vertex 
                    this.ver[u].e_flow -= flow; 

                    // Increase excess flow for adjacent 
                    this.ver[this.edge[i].v].e_flow += flow; 

                    // Add residual flow (With capacity 0 and negative 
                    // flow) 
                    this.edge[i].flow += flow; 

                    this.updateReverseEdgeFlow(i, flow); 

                    return true; 
                } 
            } 
        } 
        return false; 
    } 
    
    
    // function to relabel vertex u 
    relabel(u) 
    { 
        // Initialize minimum height of an adjacent 
        let mh = 2100000; 

        // Find the adjacent with minimum height 
        for (let i = 0; i < this.edge.length; i++) 
        { 
            if (this.edge[i].u == u) 
            { 
                // if flow is equal to capacity then no 
                // relabeling 
                if (this.edge[i].flow == this.edge[i].capacity) 
                    continue; 

                // Update minimum height 
                if (this.ver[this.edge[i].v].h < mh) 
                { 
                    mh = this.ver[this.edge[i].v].h; 

                    // updating height of u 
                    this.ver[u].h = mh + 1; 
                } 
            } 
        } 
    } 
    
    // main function for printing maximum flow of graph 
    getMaxFlow(s, t) 
    { 
        this.preflow(s); 

        // loop until none of the Vertex is in overflow 
        while (this.overFlowVertex() != -1) 
        { 
            let u = this.overFlowVertex(); 
            if (!this.push(u)) 
                this.relabel(u); 
        } 

        // ver.back() returns last Vertex, whose 
        // e_flow will be final maximum flow 
        return this.ver[this.ver.length-1].e_flow; 
    } 
} 

export default function Algoritm() {
    const [todos, setTodos] = useState([]);
    const [lastVershin, setLastVershin] = useState([]);
    const [lastCount, setLastCount] = useState(0);
    const [lastIstok, setLastIstok] = useState(0);
    const [lastStok, setLastStok] = useState(0);
    const [maxFlow, setMaxFlow] = useState(null);

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const fetchedTodos = await TodoApi.getTodos();
            setTodos(fetchedTodos);
        } catch (error) {
            console.error('Ошибка при получении задач:', error);
        }
    };

    useEffect(() => {
        if (todos.length > 0) {
            const lastTodo = todos[todos.length - 1];
            const strArray = lastTodo.vershin.slice(1, -1).split('","');
            const numberArray = strArray.map(row => row.split(',').map(item => Number(item.replace(/^["\s]+|["\s]+$/g, ''))));

            setLastCount(Number(lastTodo.count));
            setLastVershin(numberArray);
            setLastStok(Number(lastTodo.stok));
            setLastIstok(Number(lastTodo.istok));
        }
    }, [todos]);

    useEffect(() => {
        if (lastCount > 0) {
            const g = new Graph(lastCount);
            for (let index = 0; index < lastVershin.length; index++) {
                g.addEdge(lastVershin[index][0]-1, lastVershin[index][1]-1, lastVershin[index][2]);
            }
            const flow = g.getMaxFlow(lastIstok-1, lastStok-1);
            setMaxFlow(flow);
        }
    }, [lastCount, lastVershin, lastIstok, lastStok]);

    return (
        <div>
          <h2>Максимальный поток:</h2> 
          <h3 style={{color: 'red', marginBottom: '60px'}}> {maxFlow} </h3>
        </div>
    );
}