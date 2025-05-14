package com.example.userapi.dto;

import java.time.LocalDateTime;
import java.util.List;

public class UserDTO {
    private Long id;
    private String username;
    private String email;
    private List<String> roles;
    private LocalDateTime createdAt;
    private LocalDateTime lastLogin;
    private Integer age;
    private String sex;
    private Long income;
    private String segment;
    private String ageGrouped;
    private String incomeGrouped;
    private String fechaDato;
    private String indEmpleado;
    private String paisResidencia;
    private String fechaAlta;
    private Integer indNuevo;
    private Integer antiguedad;
    private String indrel;
    private String ultFecCli1t;
    private String indrel1mes;
    private String tiprel1mes;
    private String indresi;
    private String indext;
    private String conyuemp;
    private String canalEntrada;
    private String indfall;
    private String tipodom;
    private String codProv;
    private String nomprov;
    private Integer indActividadCliente;
    private Double renta;
    private String sexo;
    private String segmento;
    private Integer indAhorFinUlt1;
    private Integer indAvalFinUlt1;
    private Integer indCcoFinUlt1;
    private Integer indCderFinUlt1;
    private Integer indCnoFinUlt1;
    private Integer indCtjuFinUlt1;
    private Integer indCtmaFinUlt1;
    private Integer indCtopFinUlt1;
    private Integer indCtppFinUlt1;
    private Integer indDecoFinUlt1;
    private Integer indDemeFinUlt1;
    private Integer indDelaFinUlt1;
    private Integer indEcueFinUlt1;
    private Integer indFondFinUlt1;
    private Integer indHipFinUlt1;
    private Integer indPlanFinUlt1;
    private Integer indPresFinUlt1;
    private Integer indRecaFinUlt1;
    private Integer indTjcrFinUlt1;
    private Integer indValoFinUlt1;
    private Integer indVivFinUlt1;
    private Integer indNominaUlt1;
    private Integer indNomPensUlt1;
    private Integer indReciboUlt1;

    public UserDTO(Long id, String username, String email, List<String> roles, LocalDateTime createdAt,
                   LocalDateTime lastLogin, Integer age, String sex, Long income, String segment,
                   String ageGrouped, String incomeGrouped, String fechaDato, String indEmpleado,
                   String paisResidencia, String fechaAlta, Integer indNuevo, Integer antiguedad,
                   String indrel, String ultFecCli1t, String indrel1mes, String tiprel1mes,
                   String indresi, String indext, String conyuemp, String canalEntrada, String indfall,
                   String tipodom, String codProv, String nomprov, Integer indActividadCliente,
                   Double renta, String sexo, String segmento, Integer indAhorFinUlt1,
                   Integer indAvalFinUlt1, Integer indCcoFinUlt1, Integer indCderFinUlt1,
                   Integer indCnoFinUlt1, Integer indCtjuFinUlt1, Integer indCtmaFinUlt1,
                   Integer indCtopFinUlt1, Integer indCtppFinUlt1, Integer indDecoFinUlt1,
                   Integer indDemeFinUlt1, Integer indDelaFinUlt1, Integer indEcueFinUlt1,
                   Integer indFondFinUlt1, Integer indHipFinUlt1, Integer indPlanFinUlt1,
                   Integer indPresFinUlt1, Integer indRecaFinUlt1, Integer indTjcrFinUlt1,
                   Integer indValoFinUlt1, Integer indVivFinUlt1, Integer indNominaUlt1,
                   Integer indNomPensUlt1, Integer indReciboUlt1) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.roles = roles;
        this.createdAt = createdAt;
        this.lastLogin = lastLogin;
        this.age = age;
        this.sex = sex;
        this.income = income;
        this.segment = segment;
        this.ageGrouped = ageGrouped;
        this.incomeGrouped = incomeGrouped;
        this.fechaDato = fechaDato;
        this.indEmpleado = indEmpleado;
        this.paisResidencia = paisResidencia;
        this.fechaAlta = fechaAlta;
        this.indNuevo = indNuevo;
        this.antiguedad = antiguedad;
        this.indrel = indrel;
        this.ultFecCli1t = ultFecCli1t;
        this.indrel1mes = indrel1mes;
        this.tiprel1mes = tiprel1mes;
        this.indresi = indresi;
        this.indext = indext;
        this.conyuemp = conyuemp;
        this.canalEntrada = canalEntrada;
        this.indfall = indfall;
        this.tipodom = tipodom;
        this.codProv = codProv;
        this.nomprov = nomprov;
        this.indActividadCliente = indActividadCliente;
        this.renta = renta;
        this.sexo = sexo;
        this.segmento = segmento;
        this.indAhorFinUlt1 = indAhorFinUlt1;
        this.indAvalFinUlt1 = indAvalFinUlt1;
        this.indCcoFinUlt1 = indCcoFinUlt1;
        this.indCderFinUlt1 = indCderFinUlt1;
        this.indCnoFinUlt1 = indCnoFinUlt1;
        this.indCtjuFinUlt1 = indCtjuFinUlt1;
        this.indCtmaFinUlt1 = indCtmaFinUlt1;
        this.indCtopFinUlt1 = indCtopFinUlt1;
        this.indCtppFinUlt1 = indCtppFinUlt1;
        this.indDecoFinUlt1 = indDecoFinUlt1;
        this.indDemeFinUlt1 = indDemeFinUlt1;
        this.indDelaFinUlt1 = indDelaFinUlt1;
        this.indEcueFinUlt1 = indEcueFinUlt1;
        this.indFondFinUlt1 = indFondFinUlt1;
        this.indHipFinUlt1 = indHipFinUlt1;
        this.indPlanFinUlt1 = indPlanFinUlt1;
        this.indPresFinUlt1 = indPresFinUlt1;
        this.indRecaFinUlt1 = indRecaFinUlt1;
        this.indTjcrFinUlt1 = indTjcrFinUlt1;
        this.indValoFinUlt1 = indValoFinUlt1;
        this.indVivFinUlt1 = indVivFinUlt1;
        this.indNominaUlt1 = indNominaUlt1;
        this.indNomPensUlt1 = indNomPensUlt1;
        this.indReciboUlt1 = indReciboUlt1;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public List<String> getRoles() { return roles; }
    public void setRoles(List<String> roles) { this.roles = roles; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getLastLogin() { return lastLogin; }
    public void setLastLogin(LocalDateTime lastLogin) { this.lastLogin = lastLogin; }
    public Integer getAge() { return age; }
    public void setAge(Integer age) { this.age = age; }
    public String getSex() { return sex; }
    public void setSex(String sex) { this.sex = sex; }
    public Long getIncome() { return income; }
    public void setIncome(Long income) { this.income = income; }
    public String getSegment() { return segment; }
    public void setSegment(String segment) { this.segment = segment; }
    public String getAgeGrouped() { return ageGrouped; }
    public void setAgeGrouped(String ageGrouped) { this.ageGrouped = ageGrouped; }
    public String getIncomeGrouped() { return incomeGrouped; }
    public void setIncomeGrouped(String incomeGrouped) { this.incomeGrouped = incomeGrouped; }
    public String getFechaDato() { return fechaDato; }
    public void setFechaDato(String fechaDato) { this.fechaDato = fechaDato; }
    public String getIndEmpleado() { return indEmpleado; }
    public void setIndEmpleado(String indEmpleado) { this.indEmpleado = indEmpleado; }
    public String getPaisResidencia() { return paisResidencia; }
    public void setPaisResidencia(String paisResidencia) { this.paisResidencia = paisResidencia; }
    public String getFechaAlta() { return fechaAlta; }
    public void setFechaAlta(String fechaAlta) { this.fechaAlta = fechaAlta; }
    public Integer getIndNuevo() { return indNuevo; }
    public void setIndNuevo(Integer indNuevo) { this.indNuevo = indNuevo; }
    public Integer getAntiguedad() { return antiguedad; }
    public void setAntiguedad(Integer antiguedad) { this.antiguedad = antiguedad; }
    public String getIndrel() { return indrel; }
    public void setIndrel(String indrel) { this.indrel = indrel; }
    public String getUltFecCli1t() { return ultFecCli1t; }
    public void setUltFecCli1t(String ultFecCli1t) { this.ultFecCli1t = ultFecCli1t; }
    public String getIndrel1mes() { return indrel1mes; }
    public void setIndrel1mes(String indrel1mes) { this.indrel1mes = indrel1mes; }
    public String getTiprel1mes() { return tiprel1mes; }
    public void setTiprel1mes(String tiprel1mes) { this.tiprel1mes = tiprel1mes; }
    public String getIndresi() { return indresi; }
    public void setIndresi(String indresi) { this.indresi = indresi; }
    public String getIndext() { return indext; }
    public void setIndext(String indext) { this.indext = indext; }
    public String getConyuemp() { return conyuemp; }
    public void setConyuemp(String conyuemp) { this.conyuemp = conyuemp; }
    public String getCanalEntrada() { return canalEntrada; }
    public void setCanalEntrada(String canalEntrada) { this.canalEntrada = canalEntrada; }
    public String getIndfall() { return indfall; }
    public void setIndfall(String indfall) { this.indfall = indfall; }
    public String getTipodom() { return tipodom; }
    public void setTipodom(String tipodom) { this.tipodom = tipodom; }
    public String getCodProv() { return codProv; }
    public void setCodProv(String codProv) { this.codProv = codProv; }
    public String getNomprov() { return nomprov; }
    public void setNomprov(String nomprov) { this.nomprov = nomprov; }
    public Integer getIndActividadCliente() { return indActividadCliente; }
    public void setIndActividadCliente(Integer indActividadCliente) { this.indActividadCliente = indActividadCliente; }
    public Double getRenta() { return renta; }
    public void setRenta(Double renta) { this.renta = renta; }
    public String getSexo() { return sexo; }
    public void setSexo(String sexo) { this.sexo = sexo; }
    public String getSegmento() { return segmento; }
    public void setSegmento(String segmento) { this.segmento = segmento; }
    public Integer getIndAhorFinUlt1() { return indAhorFinUlt1; }
    public void setIndAhorFinUlt1(Integer indAhorFinUlt1) { this.indAhorFinUlt1 = indAhorFinUlt1; }
    public Integer getIndAvalFinUlt1() { return indAvalFinUlt1; }
    public void setIndAvalFinUlt1(Integer indAvalFinUlt1) { this.indAvalFinUlt1 = indAvalFinUlt1; }
    public Integer getIndCcoFinUlt1() { return indCcoFinUlt1; }
    public void setIndCcoFinUlt1(Integer indCcoFinUlt1) { this.indCcoFinUlt1 = indCcoFinUlt1; }
    public Integer getIndCderFinUlt1() { return indCderFinUlt1; }
    public void setIndCderFinUlt1(Integer indCderFinUlt1) { this.indCderFinUlt1 = indCderFinUlt1; }
    public Integer getIndCnoFinUlt1() { return indCnoFinUlt1; }
    public void setIndCnoFinUlt1(Integer indCnoFinUlt1) { this.indCnoFinUlt1 = indCnoFinUlt1; }
    public Integer getIndCtjuFinUlt1() { return indCtjuFinUlt1; }
    public void setIndCtjuFinUlt1(Integer indCtjuFinUlt1) { this.indCtjuFinUlt1 = indCtjuFinUlt1; }
    public Integer getIndCtmaFinUlt1() { return indCtmaFinUlt1; }
    public void setIndCtmaFinUlt1(Integer indCtmaFinUlt1) { this.indCtmaFinUlt1 = indCtmaFinUlt1; }
    public Integer getIndCtopFinUlt1() { return indCtopFinUlt1; }
    public void setIndCtopFinUlt1(Integer indCtopFinUlt1) { this.indCtopFinUlt1 = indCtopFinUlt1; }
    public Integer getIndCtppFinUlt1() { return indCtppFinUlt1; }
    public void setIndCtppFinUlt1(Integer indCtppFinUlt1) { this.indCtppFinUlt1 = indCtppFinUlt1; }
    public Integer getIndDecoFinUlt1() { return indDecoFinUlt1; }
    public void setIndDecoFinUlt1(Integer indDecoFinUlt1) { this.indDecoFinUlt1 = indDecoFinUlt1; }
    public Integer getIndDemeFinUlt1() { return indDemeFinUlt1; }
    public void setIndDemeFinUlt1(Integer indDemeFinUlt1) { this.indDemeFinUlt1 = indDemeFinUlt1; }
    public Integer getIndDelaFinUlt1() { return indDelaFinUlt1; }
    public void setIndDelaFinUlt1(Integer indDelaFinUlt1) { this.indDelaFinUlt1 = indDelaFinUlt1; }
    public Integer getIndEcueFinUlt1() { return indEcueFinUlt1; }
    public void setIndEcueFinUlt1(Integer indEcueFinUlt1) { this.indEcueFinUlt1 = indEcueFinUlt1; }
    public Integer getIndFondFinUlt1() { return indFondFinUlt1; }
    public void setIndFondFinUlt1(Integer indFondFinUlt1) { this.indFondFinUlt1 = indFondFinUlt1; }
    public Integer getIndHipFinUlt1() { return indHipFinUlt1; }
    public void setIndHipFinUlt1(Integer indHipFinUlt1) { this.indHipFinUlt1 = indHipFinUlt1; }
    public Integer getIndPlanFinUlt1() { return indPlanFinUlt1; }
    public void setIndPlanFinUlt1(Integer indPlanFinUlt1) { this.indPlanFinUlt1 = indPlanFinUlt1; }
    public Integer getIndPresFinUlt1() { return indPresFinUlt1; }
    public void setIndPresFinUlt1(Integer indPresFinUlt1) { this.indPresFinUlt1 = indPresFinUlt1; }
    public Integer getIndRecaFinUlt1() { return indRecaFinUlt1; }
    public void setIndRecaFinUlt1(Integer indRecaFinUlt1) { this.indRecaFinUlt1 = indRecaFinUlt1; }
    public Integer getIndTjcrFinUlt1() { return indTjcrFinUlt1; }
    public void setIndTjcrFinUlt1(Integer indTjcrFinUlt1) { this.indTjcrFinUlt1 = indTjcrFinUlt1; }
    public Integer getIndValoFinUlt1() { return indValoFinUlt1; }
    public void setIndValoFinUlt1(Integer indValoFinUlt1) { this.indValoFinUlt1 = indValoFinUlt1; }
    public Integer getIndVivFinUlt1() { return indVivFinUlt1; }
    public void setIndVivFinUlt1(Integer indVivFinUlt1) { this.indVivFinUlt1 = indVivFinUlt1; }
    public Integer getIndNominaUlt1() { return indNominaUlt1; }
    public void setIndNominaUlt1(Integer indNominaUlt1) { this.indNominaUlt1 = indNominaUlt1; }
    public Integer getIndNomPensUlt1() { return indNomPensUlt1; }
    public void setIndNomPensUlt1(Integer indNomPensUlt1) { this.indNomPensUlt1 = indNomPensUlt1; }
    public Integer getIndReciboUlt1() { return indReciboUlt1; }
    public void setIndReciboUlt1(Integer indReciboUlt1) { this.indReciboUlt1 = indReciboUlt1; }
}