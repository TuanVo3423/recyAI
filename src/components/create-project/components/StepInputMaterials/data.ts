export interface IMaterial {
  name: string;
  description: string;
  quantity: number;
}

export const updateMaterial = (material: IMaterial, materials: IMaterial[]) => {
    const index = materials.findIndex((m) => m.name === material.name);
    if (index === -1) {
        return [...materials, material];
    }
    materials[index] = material;
    return [...materials];
};
