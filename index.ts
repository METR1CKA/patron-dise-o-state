/**
 * Una empresa de repuestos para autos desea un programa que le ayude
 * a optimizar el seguimiento de los repuestos que fabrica.
 * 
 * > Un repuesto comienza con su estado Design. Una vez aprobado pasa a Review
 * > Si se aprueba pasa a Construction, si no se aprueba vuelve a Review
 * > Si se termina pasa a Finished, si no se termina vuelve a Construction
 */

/**
 * Definimos una interfaz para el estado
 */
interface ReplacementState {
  approve(replacement: Replacement, approved: boolean): void
}

/* type ReplacementState = {
  approve(replacement: Replacement, approved: boolean): void
} */

/**
 * Definimos una clase para el reemplazo
 */
class Replacement {
  private state: ReplacementState
  public approved: boolean

  constructor() {
    this.approved = false
    this.state = new Design()
    console.log('\n[+] Estado inicial:', this)
  }

  get getState() {
    return this.state
  }

  set setState(state: ReplacementState) {
    this.state = state
  }

  public approve(approved: boolean) {
    return this.state.approve(this, approved)
  }
}

/**
 * Definimos la clase para el estado de Design
 */
class Design implements ReplacementState {
  public approve(replacement: Replacement, approved: boolean): void {
    replacement.approved = approved

    if (approved) {
      replacement.setState = new Review()
      console.log('\n[+] Diseño aprobado:', replacement)
    }

    if (!approved) {
      console.error('\n[!] Diseño no aprobado, regresando al estado inicial:', replacement)
    }
  }
}

/**
 * Definimos la clase para el estado de Review
 */
class Review implements ReplacementState {
  public approve(replacement: Replacement, approved: boolean): void {
    replacement.approved = approved

    if (approved) {
      replacement.setState = new Construction()
      console.log('\n[+] Review aprobado:', replacement)
    }

    if (!approved) {
      replacement.setState = new Design()
      console.error('\n[!] Review no aprobado, regresando a Design:', replacement)
    }
  }
}

/**
 * Definimos la clase para el estado de Construction
 */
class Construction implements ReplacementState {
  public approve(replacement: Replacement, approved: boolean): void {
    replacement.approved = approved

    if (approved) {
      replacement.setState = new Finished()
      console.log('\n[+] Construction aprobado:', replacement)
    }

    if (!approved) {
      replacement.setState = new Review()
      console.error('\n[!] Construction no aprobado, regresando a Review:', replacement)
    }
  }
}

/**
 * Definimos la clase para el estado de Finished
 */
class Finished implements ReplacementState {
  public approve(replacement: Replacement, approved: boolean): void {
    replacement.approved = approved

    if (approved) {
      console.log('\n[+] Repuesto terminado')
    }

    if (!approved) {
      replacement.setState = new Construction()
      console.error('\n[!] Finished no aprobado, regresando a Construction:', replacement)
    }
  }
}

/**
 * Creamos un nuevo reemplazo y lo aprobamos
 */

// - Estado inicial
const replacement = new Replacement()

// - Aprobamos el diseño
replacement.approve(true)

// - Aprobamos el review
replacement.approve(true)

// - Aprobamos la construcción
replacement.approve(false)

// - Aprobamos el finished
// replacement.approve(true)
