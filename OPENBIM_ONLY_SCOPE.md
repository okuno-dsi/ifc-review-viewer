# OpenBIM-Only Scope

このフォルダは、内部評価用ビューアを公開可能な一般解へ寄せるための作業コピーです。

含めるもの:

- IFC viewer and reviewer
- ST-Bridge structural viewer
- local comments and JSON import/export
- view state import/export
- clipping, measurement, model/category/level visibility

含めないもの:

- Revit package data
- converted Revit geometry or attribute JSON
- project owner write tokens
- internal review return server APIs
- MCP or A2A gateway UI
- private project sample files

公開前チェックでは、`.ifc`, `.stb`, `.rvt`, `.rfa`, `.dwg`, `.dxf`, `.pdf`, Office files, archives, and ST-Bridge XML model files must not be tracked unless they are explicitly approved public samples.
