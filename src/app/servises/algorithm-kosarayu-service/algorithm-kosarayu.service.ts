import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlgorithmKosarayuService {

  public algoritmKosarayu(inputGraph: any) {
    const stack = this._dfsReturnsStack(inputGraph);
    const strongConnected = this._dfsRevers(inputGraph, stack);

    return strongConnected;
  }

  private _dfsReturnsStack(graph: any) {
    const stack: any[] = [];
    const used = new Set();

    Object.keys(graph).forEach(vertex => {
        if (!used.has(vertex)) {
            this._dfsCompReturnsStack(vertex, graph, used, stack);
        }
    });

    return stack;
  }

  private _dfsCompReturnsStack(vertex: any, graph: any[], used: any, stack: any) {
    used.add(vertex);
    graph[vertex].forEach((neighbor: any) => {
        if (!used.has(neighbor)) {
            this._dfsCompReturnsStack(neighbor, graph, used, stack);
        }
    });
    stack.push(vertex);
  }

  private _reversOrGraph(graph: any) {
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

  private _dfsRevers(graph: any, stack: any[]) {
    let strong: any[] = [];
    let used: Set<any> = new Set();
    let reversedOrGraph = this._reversOrGraph(graph);

    while (stack.length) {
        let vertex = stack.pop();
        if (!used.has(vertex)) {
            strong.push(this._dfsReturnsStrong(vertex, reversedOrGraph, used));
        }
    }
      
    return strong;
  }

  private _dfsReturnsStrong(vertex: any, graph: any, used: Set<any>, strong: any = null) {
    used.add(vertex);

    strong = strong ?? new Set();

    strong.add(vertex);

    graph[vertex].forEach((neighbor: any) => {
        if (!used.has(neighbor)) {
            this._dfsReturnsStrong(neighbor, graph, used, strong);
        }
    });

    return strong;
  }
}
