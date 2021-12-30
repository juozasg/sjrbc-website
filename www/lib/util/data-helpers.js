export function safeID(name) {
  return name.replaceAll(/\s+/g, '-').replaceAll(/-+/g, '-')
}