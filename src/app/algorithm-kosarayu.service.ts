import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlgorithmKosarayuService {

  constructor() { }

  // const or_graph = {
  //     'a': new Set('b'),
  //     'b': new Set('c'),
  //     'c': new Set('a'),
  // };

  algoritmKosarayu(inputGraph: any) {
    // let inputGraph = {
    //     'a': new Set('b'),
    //     'b': new Set(['c', 'd']),
    //     'c': new Set('a'),
    //     'd': new Set('e'),
    //     'e': new Set('f'),
    //     'f': new Set('d'),
    //     'g': new Set(['f', 'h']),
    //     'h': new Set('i'),
    //     'i': new Set('j'),
    //     'j': new Set('g'),
    //     'k': new Set('j')
    // };

    // let inputGraph = {
    //     'a': new Set('b'),
    //     'b': new Set('a')
    // };

    // inputGraph = {
    //     a: new Set(['b', 'c']),
    //     b: new Set([]),
    //     c: new Set([]),
    // };

    let stack = this.dfsReturnsStack(inputGraph);
    //console.log("main stack =", stack);

    const strongConnected = this.dfsRevers(inputGraph, stack);

    return strongConnected;
  }

  // Обход графа в глубину.
  // Возвращает очередь компоненты связности
  dfsReturnsStack(graph: any) {
    const stack: any[] = [];
    const used = new Set();

    Object.keys(graph).forEach(vertex => {
        if (!used.has(vertex)) {
            this.dfsCompReturnsStack(vertex, graph, used, stack);
        }
    });

    return stack;
  }

  // Обход компоненты связности в глубину
  // Пополняет очередь stack вершинами компоненты связности
  dfsCompReturnsStack(vertex: any, graph: any[], used: any, stack: any) {
    used.add(vertex);
    graph[vertex].forEach((neighbor: any) => {
        if (!used.has(neighbor)) {
            this.dfsCompReturnsStack(neighbor, graph, used, stack);
        }
    });
    stack.push(vertex);
  }

  // Возвращает обратный орграф.
  reversOrGraph(graph: any) {
    const reversedGraph: any = {};
    Object.keys(graph).forEach((vertex: any) => {
        reversedGraph[vertex] = new Set();
    });

    Object.keys(graph).forEach((vertex: any) => {
        graph[vertex].forEach((neighbor: any) => {
            reversedGraph[neighbor].add(vertex);
        });
    });

    return reversedGraph;
  }

  // Обратный обход графа в глубину по стэку (stack).
  // Возвращает list с множествами сильных компанент связности.
  dfsRevers(graph: any, stack: any[]) {
    let strong: any[] = [];
    let used: Set<any> = new Set();
    let reversedOrGraph = this.reversOrGraph(graph);
    
    //console.log("reversedOrGraph =", reversedOrGraph);


    while (stack.length) {
        //console.log("+");
        let vertex = stack.pop();
        if (!used.has(vertex)) {
            //console.log("vertex =", vertex);
            strong.push(this.dfsReturnsStrong(vertex, reversedOrGraph, used));
        }
    }
      
    return strong;
  }

  // Обход компоненты в глубину.
  // Возвращает сильную компаненту.
  dfsReturnsStrong(vertex: any, graph: any, used: Set<any>, strong: any = null) {
    used.add(vertex);

    strong = strong ?? new Set();

    strong.add(vertex);

    graph[vertex].forEach((neighbor: any) => {
        //console.log("neighbor =", neighbor);
        if (!used.has(neighbor)) {
            this.dfsReturnsStrong(neighbor, graph, used, strong);
        }
    });

    return strong;
  }


}
