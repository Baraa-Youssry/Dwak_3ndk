import medicines from '../data/medicines'
import inventory from '../data/inventory'
import pharmacies from '../data/pharmacies'

export function searchMedicines(query) {
  if (!query || query.trim() === '') return []

  const normalized = query.trim().toLowerCase()
  return medicines.filter((m) => {
    const name = m.name.toLowerCase()
    const category = m.category.toLowerCase()
    const description = m.description.toLowerCase()

    return (
      name.includes(normalized) ||
      category.includes(normalized) ||
      description.includes(normalized)
    )
  })
}

export function getPharmaciesForMedicine(medicineId) {
  return inventory
    .filter((inv) => inv.medicineId === medicineId)
    .map((inv) => {
      const pharmacy = pharmacies.find((p) => p.id === inv.pharmacyId)
      return {
        pharmacyId: inv.pharmacyId,
        pharmacy,
        price: inv.price,
        quantity: inv.quantity,
        available: inv.available,
      }
    })
    .filter((item) => item.pharmacy)
}

export function getMedicineById(id) {
  return medicines.find((m) => m.id === id)
}

export function getPharmacyById(id) {
  return pharmacies.find((p) => p.id === id)
}

export function getInventoryForPharmacy(pharmacyId) {
  return inventory
    .filter((inv) => inv.pharmacyId === pharmacyId)
    .map((inv) => ({
      ...inv,
      medicine: medicines.find((m) => m.id === inv.medicineId),
    }))
    .filter((inv) => inv.medicine)
}

export function getCategories() {
  return [...new Set(medicines.map((m) => m.category))]
}
